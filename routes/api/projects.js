import express from 'express'
import { getProjects, findProject, createProject } from "../../controllers/projectController.js"
const router = express.Router()

router.route('/')
    .get(getProjects)
    .post(createProject)

router.route('/:id')
    .get(findProject)



export { router }





















