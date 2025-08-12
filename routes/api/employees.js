import express from 'express'
const router = express.Router()
import { getEmployees, findEmployee } from "../../controllers/employeesController.js"

router.route('/')
    .get(getEmployees)
    

router.route('/:id')
    .get(findEmployee)


export { router }


















