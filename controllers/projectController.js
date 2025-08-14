import { ProjectModel as projects } from '../model/ProjectModel.js'

const getProjects = async (req, res) => {
    const results = await projects.getAllProjects()
    res.json(results)
}

const findProject = async (req, res) => {
    const results = await projects?.findById(req.params.id)
    res.json(results)
}

const createProject = async (req, res) => {
    await projects.createProject(req.body)
    console.log('project created')
    res.sendStatus(200)
}
const updateProject = async (req, res) => {

}
const deleteProject = async (req, res) => {

}

export {
    getProjects,
    findProject,
    createProject
}