import { ProjectModel as projects } from '../model/ProjectModel.js'

const getProjects = async (req, res) => {
    const results = await projects.getAllProjects()
    console.log(results)
    console.log(projects)
    res.json(results)
}

const findProject = async (req, res) => {
    const results = await projects?.findById(req.params.id)
    res.json(results)
}

const createProject = async (req, res) => {
    
}
const updateProject = async (req, res) => {

}
const deleteProject = async (req, res) => {

}

export {
    getProjects,
    findProject
}