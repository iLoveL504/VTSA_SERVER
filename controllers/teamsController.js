import { TeamModel as teams } from '../model/TeamModel.js'

export const getAllTeams = async (req, res) => {
    const results = await teams.getAllTeams()
  
    res.json(results).status(200)
}
export const getLastTeamId = async (req, res) => {
    const results = await teams.getLastTeamId()
  
    res.json(results).status(200)
}
export const getTeamPerId = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await teams.getTeamPerId(Number(id));
        console.log(results)
        res.status(200).json(results);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getTeamDesignation = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await teams.getTeamDesignation(Number(id))
        console.log(id)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const forecastTeam = async (req, res) => {
    try {
        console.log('hi')
        const { manufacturing_end_date } = req.body;
        console.log(manufacturing_end_date)
        const results = await teams.forecastTeam(manufacturing_end_date)
        console.log(results)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getTeamsWithNoProject = async (req, res) => {
    try {
        const results = await teams.getTeamsWithNoProject()
        console.log('hi')
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
