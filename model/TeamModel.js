import { pool } from '../config/database.js'

class TeamModel {
    static async getAllTeams() {
        const [ results ] = await pool.query(`
            select t.team_id, t.Foreman, f.employee_id as 'foreman_id', CONCAT(e.first_name, ' ', e.last_name) AS full_name, e.employee_id, e.job, t.project_id, p.lift_name, p.created_at, p.manufacturing_end_date from teams t left join employees f on f.employee_id = t.foreman_id left join team_members tm on tm.foreman_id = t.team_id left JOIN employees e ON e.employee_id = tm.emp_id left join projects p on p.id = t.project_id`
        )
        return results
    }
    static async getTeamsWithNoProject() {
        const [ results ] = await pool.query(`
                    SELECT 
                    t.team_id, 
                    t.Foreman, 
                    f.employee_id as 'foreman_id', 
                    CONCAT(e.first_name, ' ', e.last_name) AS full_name, 
                    e.employee_id, 
                    e.job, 
                    t.project_id, 
                    p.lift_name, 
                    p.created_at, 
                    p.manufacturing_end_date 
                FROM teams t 
                LEFT JOIN employees f ON f.employee_id = t.foreman_id 
                LEFT JOIN team_members tm ON tm.foreman_id = t.team_id 
                LEFT JOIN employees e ON e.employee_id = tm.emp_id 
                LEFT JOIN projects p ON p.id = t.project_id where t.project_id is null
                ;`
        )
        return results
    }
    static async getLastTeamId() {
        const [ results ] = await pool.query(
            `select team_id from (select tm.team_id, t.team_name, e.username from team_members tm
            join employees e on tm.emp_id = e.employee_id join teams t on tm.team_id = t.team_id) as \`aggregate_team\` order by team_id desc limit 1`
        )
        return results
    }
    static async getTeamPerId(id) {
    
    if (id === undefined || id === null) {
        throw new Error('ID parameter is required');
    }
    
    const [results] = await pool.query(
        `select t.team_id, t.Foreman, f.employee_id as 'foreman_id', CONCAT(e.first_name, ' ', e.last_name) AS full_name, e.employee_id, e.job, t.project_id, p.lift_name, p.created_at, p.manufacturing_end_date from teams t left join employees f on f.employee_id = t.foreman_id left join team_members tm on tm.foreman_id = t.team_id left JOIN employees e ON e.employee_id = tm.emp_id left join projects p on p.id = t.project_id where p.id = (:id)`,  
        {id : id}                    
    );
    console.log('blah')
    return results;
    }

    static async getTeamDesignation(id) {
        const [ results ] = await pool.query(`
               select t.team_id, t.Foreman, f.employee_id as 'foreman_id', CONCAT(e.first_name, ' ', e.last_name) AS full_name, e.employee_id, e.job, t.project_id, p.lift_name, p.created_at, p.manufacturing_end_date from teams t left join employees f on f.employee_id = t.foreman_id left join team_members tm on tm.foreman_id = t.team_id left JOIN employees e ON e.employee_id = tm.emp_id left join projects p on p.id = t.project_id where e.employee_id = (:id)
            `, {id: id})

        return results
    }

    static async forecastTeam(date){
        const [ results ] = await pool.query(`
                select t.team_id, t.Foreman, f.employee_id as 'foreman_id', CONCAT(e.first_name, ' ', e.last_name) AS full_name, e.employee_id, e.job, t.project_id, p.lift_name, p.created_at, p.manufacturing_end_date from teams t join employees f on f.employee_id = t.foreman_id join team_members tm on tm.foreman_id = t.team_id JOIN employees e ON e.employee_id = tm.emp_id join projects p on p.id = t.project_id where project_end_date < :manufacturing_end_date
            `, {manufacturing_end_date: date})
        
        let employees = await Promise.all(
            results.map(async (e) => {
                    const [emp]= await pool.query(`select * from employees where employee_id = :id`, {id : e.employee_id})
                    return emp[0]
                })
            )
        

        return employees
    }
}

export { TeamModel }