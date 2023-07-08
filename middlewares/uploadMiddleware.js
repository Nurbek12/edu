import url from 'url'
import multer from 'multer'
import { join, extname } from 'path'
import { v4 as uuid } from 'uuid'

const dirname = url.fileURLToPath(new URL('.', import.meta.url))

const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, join(dirname, '../', 'upload')),
    filename: (_, file, cb) => cb(null, 'fayl_'+uuid()+'_'+extname(file.originalname))
})

export const upload = multer({ storage })