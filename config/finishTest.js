import Result from "../models/Result.js"
import { checkTrueVarinat } from '../controllers/testController.js'

export function timerFunction(minute, id) {
    const milliseconds = (minute + 5) * 60 * 1000 + 4000;
    const timer = setTimeout(async () => {
        const result = await Result.findById(id)
        if(result.status !== 'finish'){
            await result.updateOne({
                $set: {
                    status: 'finish',
                    rate: checkTrueVarinat(result.questions),
                    end_time: Date.now(),
                }
            })
        }
    }, milliseconds);
    timer.unref();
}