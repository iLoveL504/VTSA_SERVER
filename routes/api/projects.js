import express from 'express'
import { getProjects, findProject } from "../../controllers/projectController.js"
const router = express.Router()

router.route('/')
    .get(getProjects)

router.route('/:id')
    .get(findProject)

export { router }





















