import fsPromise from "fs/promises"
import { format } from "date-fns"

export const logDate = (req, res, next) => {
    const date = format(new Date(),'MM/dd/yyyy hh:mm:ss aaaa')
    console.log(date)
    console.log(req.body)
    next()
}

