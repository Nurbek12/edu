import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { secret } from '../config/keys.js'

function getDefaultInterval(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    let start, end;
    if (month >= 9 || month <= 2) {
        start = new Date(year - 1, 8, 1);
        end = new Date(year, 1, 28);
    } else {
        start = new Date(year, 2, 1);
        end = new Date(year, 7, 31);
    }
    return {
        $gte: start,
        $lte: end
    }
}

export const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: 'Вы не можете сделать этот запрос.' })
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, secret, (err, payload) => {
        if (err) return res.status(401).json({ error: 'Вы не можете сделать этот запрос.' })
        User.findById(payload._id).then(user => {
            if (req.query.gte && req.query.lte){
                req.distance = { $gte: new Date(req.query.gte), $lte: new Date(req.query.lte) }
                delete req.query.gte
                delete req.query.lte
            } 
            else req.distance = getDefaultInterval()
            req.user = user
            next()
        })
    });
}


    // if (month >= 9 && month <= 12) {
    //     // осенний семестр
    //     start = new Date(year, 8, 1); // месяцы в JavaScript начинаются с 0, поэтому 8 - это сентябрь
    //     end = new Date(year + 1, 0, 1); // конец декабря
    // } else if (month >= 1 && month <= 2 || month === 3 && now.getDate() <= 15) {
    //     // зимний семестр
    //     start = new Date(year - 1, 8, 1);
    //     end = new Date(year, 2, 15);
    // } else {
    //     // весенний семестр
    //     start = new Date(year, 2, 16);
    //     end = new Date(year, 8, 1); // конец августа
    // }