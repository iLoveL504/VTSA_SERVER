import express from 'express'
import { getProjects, findProject, createProject, updateProject, makeProjectSchedule } from "../../controllers/projectController.js"
const router = express.Router()

router.route('/')
    .get(getProjects)
    .post(createProject)

router.route('/schedule/:id')
    .post(makeProjectSchedule)

router.route('/:id')
    .get(findProject)
    .put(updateProject)




export { router }





















