import { ProjectModel as projects } from '../model/ProjectModel.js'

export const getProjects = async (req, res) => {
    const results = await projects.getAllProjects()
    res.json(results)
}

export const findProject = async (req, res) => {
    const results = await projects?.findById(req.params.id)
    res.json(results)
}

export const createProject = async (req, res) => {
    console.log(req.body)
    await projects.createProject(req.body)
    console.log('project created')
    const results = await projects.getAllProjects()
    res.status(200).json(results)
}
export const updateProject = async (req, res) => {
    try{
        console.log(req.body)
        const results = await projects.updateProjects(req.body)
        if (results.length === 0) return res.status(404).json({"message": "not found"})
        console.log(req.body)
        res.json({"message": "found"})
    } catch (e) {
        console.error("Error updating project:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }

    
}
const deleteProject = async (req, res) => {

}

