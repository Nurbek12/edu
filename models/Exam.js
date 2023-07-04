import { model, Schema }  from 'mongoose'

export default model('exams', new Schema({
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'groups'
    }],
    test: {
        type: Schema.Types.ObjectId,
        ref: 'tests'
    },
    count: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
}))


// table group {
//     _id ObjectId
//     name string
//   }
  
//   table science {
//     _id ObjectId
//     name string
//   }
  
//   table user {
//     _id ObjectId
//     name string
//     phone string
//     birthdate string
//     group ObjectId
//     login string
//     password string
//     role string // [student, admin, teacher, inspector, sa]
//   }
  
//   table test {
//     _id ObjectId
//     name string
//     science string
//   }
  
//   table question {
//     _id ObjectId
//     test ObjectId
//     text string
//     selected ObjectId
//     varinats [ObjectId]
//   }
  
//   table variant {
//     _id ObjectId
//     text string
//     value number
//   }

//   table exam {
//     _id ObjectId
//     group [ObjectId]
//     test ObjectId
//     count number
//     time number
//     date string
//   }
  
//   table result {
//     _id ObjectId
//     student ObjectId
//     exam ObjectId
//     start_time string
//     end_time string
//     status string // [start, finish]
//     rate number
//     questions [ObjectId]
//   }
  
  
  
//   table resource {
//     _id ObjectId
//     science string
//     resources [ObjectId]
//     group ObjectId
//     teacher ObjectId
//   }
  
//   table resourceFiles {
//     _id ObjectId
//     file string
//     name string
//     date string
//   }
  
//   table schedule {
//     _id ObjectId
//     name string
//     group ObjectId
//     day string // [monday, tuesday, wednesday, thursday, friday, sunday, saturday]
//     tables [ObjectId]
// Monday, Tuesday, Wednesday, Thursday, Friday

// Weekend:
// Saturday, Sunday
//   }
  
//   table scheduleTable {
//     _id ObjectId
//     teacher ObjectId
//     science string
//   }
  
  
//   table rate {
//     student ObjectId
//     rate number
//     date string
//   }