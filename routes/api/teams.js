import express from 'express'
const router = express.Router()
import { getAllTeams } from '../../controllers/teamsController.js'

router.route('/')
    .get(getAllTeams)

export { router }