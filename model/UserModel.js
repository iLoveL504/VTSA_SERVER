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
}

export { UserModel }