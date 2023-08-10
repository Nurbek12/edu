import { Types } from 'mongoose'
import User from '../models/User.js'
import excel from 'exceljs'

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { v4 as uuid } from 'uuid'

const dirname = fileURLToPath(new URL('.', import.meta.url));

function convertArrayToObject(array) {
    const result = {};
    for (let i = 0; i < array.length; i++) {
        const obj = array[i];
        const key = Object.keys(obj)[0];
        const value = obj[key];
        result[key] = value;
    }
    return result;
}

export const getRateStudent = async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $match: { _id: new Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: 'homeworks',
                    let: { studentGroup: '$group' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$$studentGroup', '$groups'],
                                },
                                createdAt: req.distance,
                            },
                        },
                        {
                            $group: {
                                _id: '$subject',
                                totalElems: {
                                    $sum: 1,
                                },
                            },
                        },
                    ],

                    as: 'homeworks_length',
                }
            },
            {
                $lookup: {
                    from: 'student-homeworks',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'homeworks',
                    pipeline: [{
                        $match: { rate: { $exists: true, $ne: null }, createdAt: req.distance }
                    },
                    {
                        $project: {
                            rate: 1,
                            subject: 1,
                        }
                    },
                    {
                        $group: {
                            _id: "$subject",
                            totalRate: {
                                $sum: "$rate"
                            }
                        }
                    }]
                }
            },

            // midterms
            {
                $lookup: {
                    from: 'midterms',
                    let: { studentGroup: '$group' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$$studentGroup', '$groups'],
                                },
                                createdAt: req.distance,
                            },
                        },
                        {
                            $group: {
                                _id: '$subject',
                                totalElems: { $sum: 1 },
                            },
                        },
                    ],
                    as: 'midterms_length',
                },
            },
            {
                $lookup: {
                    from: 'results',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'midterms',
                    pipeline: [{
                        $match: { createdAt: req.distance, exam: null, questions: { $ne: [] } }
                    }, {
                        $group: {
                            _id: "$subject",
                            totalRate: {
                                $sum: {
                                    $multiply: [
                                        { $divide: ['$rate', { $size: '$questions' }] },
                                        100
                                    ]
                                }
                            },
                        }
                    }]
                }
            },


            // exams
            {
                $lookup: {
                    from: 'exams',
                    let: { studentGroup: '$group' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$$studentGroup', '$groups'],
                                },
                                createdAt: req.distance,
                            },
                        },
                        {
                            $lookup: {
                                from: 'tests',
                                foreignField: '_id',
                                localField: 'test',
                                as: 'test',
                            }
                        },
                        {
                            $project: {
                                subject: { $arrayElemAt: ["$test.subject", 0] }
                            }
                        },
                        {
                            $group: {
                                _id: '$subject',
                                totalElems: {
                                    $sum: 1,
                                },
                            },
                        },
                    ],
                    as: 'exams_length',
                }
            },
            {
                $lookup: {
                    from: 'results',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'exams',
                    pipeline: [{
                        $match: { createdAt: req.distance, midterm: null, questions: { $ne: [] }  }
                    }, {
                        $group: {
                            _id: "$subject",
                            totalRate: {
                                $sum: {
                                    $multiply: [
                                        { $divide: ['$rate', { $size: '$questions' }] },
                                        100
                                    ]
                                }
                            },
                        }
                    }]
                }
            },

            {
                $project: {
                    name: 1,
                    homeworks_length: 1,
                    homeworks: 1,

                    midterms: 1,
                    midterms_length: 1,

                    exams: 1,
                    exams_length: 1,
                }
            }
        ])

        const newresult = result.map(({ homeworks_length, homeworks,
            exams, exams_length, midterms, midterms_length, name }) => {

            const jn = homeworks_length.map((homework) => {
                const hmw = homeworks.find(h => h._id === homework._id);
                const rate = (hmw?.totalRate * 100) / (homework?.totalElems * 5)

                return { [homework._id]: rate || 0 };
            })

            const yn = exams_length.map((exam) => {
                const exs = exams.find(e => e._id === exam._id);
                const rate = (exs?.totalRate) / (exam?.totalElems)
                return { [exam._id]: rate || 0 };
            })

            const on = midterms_length.map((midterm) => {
                const mdr = midterms.find(m => m._id === midterm._id);
                const rate = (mdr?.totalRate) / (midterm?.totalElems)
                return { [midterm._id]: rate || 0 };
            })

            const subjects = [...new Set([...on, ...yn, ...jn].flatMap(item => Object.keys(item)))];

            return { name, on: convertArrayToObject(on), jn: convertArrayToObject(jn), yn: convertArrayToObject(yn), subjects }
        });
        res.status(200).json(newresult[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const downloadByGroup = async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $match: { group: new Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: 'homeworks',
                    let: { studentGroup: '$group' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$$studentGroup', '$groups'],
                                },
                                createdAt: req.distance,
                            },
                        },
                        {
                            $group: {
                                _id: '$subject',
                                totalElems: {
                                    $sum: 1,
                                },
                            },
                        },
                    ],

                    as: 'homeworks_length',
                }
            },
            {
                $lookup: {
                    from: 'student-homeworks',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'homeworks',
                    pipeline: [{
                        $match: { rate: { $exists: true, $ne: null }, createdAt: req.distance }
                    },
                    {
                        $project: {
                            rate: 1,
                            subject: 1,
                        }
                    },
                    {
                        $group: {
                            _id: "$subject",
                            totalRate: {
                                $sum: "$rate"
                            }
                        }
                    }]
                }
            },

            // midterms
            {
                $lookup: {
                    from: 'midterms',
                    let: { studentGroup: '$group' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$$studentGroup', '$groups'],
                                },
                                createdAt: req.distance,
                            },
                        },
                        {
                            $group: {
                                _id: '$subject',
                                totalElems: { $sum: 1 },
                            },
                        },
                    ],
                    as: 'midterms_length',
                },
            },
            {
                $lookup: {
                    from: 'results',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'midterms',
                    pipeline: [{
                        $match: { createdAt: req.distance, exam: null, questions: { $ne: [] } }
                    }, {
                        $group: {
                            _id: "$subject",
                            totalRate: {
                                $sum: {
                                    $multiply: [
                                        { $divide: ['$rate', { $size: '$questions' }] },
                                        100
                                    ]
                                }
                            },
                        }
                    }]
                }
            },


            // exams
            {
                $lookup: {
                    from: 'exams',
                    let: { studentGroup: '$group' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$$studentGroup', '$groups'],
                                },
                                createdAt: req.distance,
                            },
                        },
                        {
                            $lookup: {
                                from: 'tests',
                                foreignField: '_id',
                                localField: 'test',
                                as: 'test',
                            }
                        },
                        {
                            $project: {
                                subject: { $arrayElemAt: ["$test.subject", 0] }
                            }
                        },
                        {
                            $group: {
                                _id: '$subject',
                                totalElems: {
                                    $sum: 1,
                                },
                            },
                        },
                    ],
                    as: 'exams_length',
                }
            },
            {
                $lookup: {
                    from: 'results',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'exams',
                    pipeline: [{
                        $match: { createdAt: req.distance, midterm: null, questions: { $ne: [] } }
                    }, {
                        $group: {
                            _id: "$subject",
                            totalRate: {
                                $sum: {
                                    $multiply: [
                                        { $divide: ['$rate', { $size: '$questions' }] },
                                        100
                                    ]
                                }
                            },
                        }
                    }]
                }
            },

            {
                $project: {
                    name: 1,
                    homeworks_length: 1,
                    homeworks: 1,

                    midterms: 1,
                    midterms_length: 1,

                    exams: 1,
                    exams_length: 1,
                }
            }
        ])

        const newresult = result.map(({ homeworks_length, homeworks,
            exams, exams_length, midterms, midterms_length, name }) => {

            const jn = homeworks_length.map((homework) => {
                const hmw = homeworks.find(h => h._id === homework._id);
                const rate = (hmw?.totalRate * 100) / (homework?.totalElems * 5)

                return { [homework._id]: rate || 0 };
            })

            const yn = exams_length.map((exam) => {
                const exs = exams.find(e => e._id === exam._id);
                const rate = (exs?.totalRate) / (exam?.totalElems)
                return { [exam._id]: rate || 0 };
            })

            const on = midterms_length.map((midterm) => {
                const mdr = midterms.find(m => m._id === midterm._id);
                const rate = (mdr?.totalRate) / (midterm?.totalElems)
                return { [midterm._id]: rate || 0 };
            })

            const subjects = [...new Set([...on, ...yn, ...jn].flatMap(item => Object.keys(item)))];

            return { name, on: convertArrayToObject(on), jn: convertArrayToObject(jn), yn: convertArrayToObject(yn), subjects }
        });


        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Rates');

        const headers = ['Talabalar', ...newresult[0].subjects];

        worksheet.addRow(headers);

        newresult.forEach(({ name, on, jn, yn, subjects }) => {
            const rowData = subjects.reduce((acc, item) => {
                const total = parseFloat( ((on[item]||0) + (jn[item]||0) + (yn[item]||0)) / 3 ).toFixed(1)
                acc[item] = total;
                return acc;
            }, { students: name });
            worksheet.addRow(Object.values(rowData));
        });

        worksheet.columns.forEach((column) => {
            column.width = 20;
            column.alignment = 'left'
        });

        const file = path.join(dirname, '../', 'protected', `file-${uuid()}.xlsx`);
        workbook.xlsx.writeFile(file)
            .then(() => {
                res.setHeader('Content-disposition', 'attachment; filename=file.xlsx');
                res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.download(file, () => {
                    setTimeout(() => fs.rmSync(file, { force: true }), 10000)
                })
            }).catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}