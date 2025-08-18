import { pool } from '../config/database.js'

class TeamModel {
    static async getAllTeams() {
        const [ results ] = await pool.query(`
            SELECT t.team_id, e.last_name, e.job as role
            FROM employees e
            JOIN teams t ON t.emp_id = e.employee_id;`
        )
        return results
    }
}

export { TeamModel }