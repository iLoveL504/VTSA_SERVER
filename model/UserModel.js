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
}

export { UserModel }