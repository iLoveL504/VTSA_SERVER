import { pool } from '../config/database.js'

class TeamModel {
    static async getAllTeams() {
        const [ results ] = await pool.query(`
            select tm.team_id, t.team_name, e.username, p.lift_name, p.created_at, p.manufacturing_end_date
			from team_members tm
            join employees e on tm.emp_id = e.employee_id join teams t on tm.team_id = t.team_id
            join projects p on p.id = t.project_id`
        )
        return results
    }
    static async getEmployeesWithNoTeam() {
        const [ results ] = await pool.query(`
            select e.employee_id
			from team_members tm
            join employees e on tm.emp_id = e.employee_id join teams t on tm.team_id = t.team_id
            join projects p on p.id = t.project_id`
        )
        const ids = results.map(e => e.employee_id)
        console.log(ids)
        const [employees] = await pool.query('select * from employees where employee_id not in (?)', [ids])
        return employees
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
        'CALL GetTeamPerID(:id)',  
        {id : id}                    
    );
    console.log('blah')
    return results;
    }

    static async getTeamDesignation(id) {
        const [ results ] = await pool.query(`
                select p.lift_name as 'project name', t.team_id, t.team_name, e.username, e.job, e.employee_id from team_members tm
                join employees e on tm.emp_id = e.employee_id join teams t on tm.team_id = t.team_id join projects p on
                p.id = t.project_id where employee_id = :id
            `, {id: id})

        return results
    }

    static async forecastTeam(date){
        const [ results ] = await pool.query(`
                select tm.team_id, t.team_name, e.employee_id, e.username, p.lift_name as 'assigned_project', p.created_at, p.project_end_date
                from team_members tm
                join employees e on tm.emp_id = e.employee_id join teams t on tm.team_id = t.team_id
                join projects p on p.id = t.project_id where project_end_date < :manufacturing_end_date
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