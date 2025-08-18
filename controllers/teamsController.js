import { TeamModel as teams } from '../model/TeamModel.js'

export const getAllTeams = async (req, res) => {
    const results = await teams.getAllTeams()
  
    res.json(results).status(200)
}