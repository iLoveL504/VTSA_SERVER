import { pool } from '../config/database.js'

class UserModel {
    static async findById(id){
        const [ results, fields ] = await pool.query(
            'SELECT * FROM employees WHERE employee_id = :id',
            { id: id }
        )
        return results[0]
    }

    static async getAllUsers(){
        const [ results ] = await pool.query(
            'SELECT * FROM employees'
        )
       
        return results
    }

    static async updateUser(user){
        const {
            last_name,
            first_name,
            employee_id
        } = user
        const [ results ] = await pool.query(
            `update employees set last_name = :last_name, first_name = :first_name where employee_id = :employee_id`,
            {
                employee_id: employee_id,
                last_name: last_name,
                first_name: first_name
            }
        )
    }

    static async getDesignatedProject (id) {
        const [result] = await pool.query(`
                select t.project_engineer_id,  CONCAT(pe.first_name, ' ', pe.last_name) as Project_Engineer, t.Foreman, f.employee_id as 'foreman_id', CONCAT(e.first_name, ' ', e.last_name) AS full_name, e.employee_id, e.job, t.project_id, p.lift_name, p.created_at, p.manufacturing_end_date from teams t left join employees f on f.employee_id = t.foreman_id left join team_members tm on tm.foreman_id = t.team_id left JOIN employees e ON e.employee_id = tm.emp_id left join projects p on p.id = t.project_id
                left join employees pe on pe.employee_id = t.project_engineer_id where e.employee_id = :id;
            `, {id: id})
        if(!result.length) return result
        const projectId = result[0].project_id
        const [project] = await pool.query(`
                select * from projects where id = :id
            `, {id: projectId})            
        return project
    }
}

export { UserModel }