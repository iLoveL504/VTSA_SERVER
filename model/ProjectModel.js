import { pool } from '../config/database.js'

class ProjectModel {
    static async findById(id){
        const [ results, fields ] = await pool.query(
            'SELECT * FROM projects WHERE id = :id',
            { id: id }
        )
        return results[0]
    }

    static async getAllProjects(){
        const [ results ] = await pool.query(
            'SELECT * FROM projects'
        )
       
        return results
    }
}

export { ProjectModel }