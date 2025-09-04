import { pool } from '../config/database.js'
import dotenv from 'dotenv'
dotenv.config()
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
        console.log("Connected to DB:", process.env.MYSQL_DATABASE);

        return results
    }
    static async createProject(project){
        const {
            liftName,
            description,
            cap,
            drive,
            doorOperator,
            speed,
            control,
            stops,
            servingFloor,
            travel,
            powerSupply,
            shaft,
            shaftSize,
            carSize,
            doorSize,
            overheadHeight,
            pitDepth
        } = project;
       // In ProjectModel.createProject - change the parameter names to match frontend
        const [results] = await pool.query(
            `INSERT INTO projects 
                (lift_name, description, cap, drive, door_operator, speed,
                control, stops, serving_floor, travel, power_supply, shaft, shaft_size, 
                car_size, door_size, overhead_height, pit_depth) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                liftName,
                description,
                cap,
                drive,
                doorOperator,
                speed,
                control,
                stops,
                servingFloor,
                travel,             
                powerSupply,
                shaft,
                shaftSize,
                carSize,
                doorSize,
                overheadHeight,
                pitDepth
            ]
            );
            console.log("Insert results:", results);
       
        return results
    }

    static async updateProjects(project){
        const {
            id,
            lift_name,
            description,
            cap,
            speed,
            stops,
            travel,
            overhead_height,
            pit_depth,
            manufacturing_end_date,
            project_end_date
        } = project

          const formatDate = (date) => {
            if (!date) return null
            return new Date(date).toISOString().split("T")[0]
        }
                
        const [ results ] = await pool.query(
                `UPDATE projects 
       SET lift_name = ?, description = ?, cap = ?, speed = ?, stops = ?, 
           travel = ?, overhead_height = ?, pit_depth = ?, 
           manufacturing_end_date = ?, project_end_date = ?
       WHERE id = ?`,
      [
        lift_name,
        description,
        cap,
        speed,
        stops,
        travel,
        overhead_height,
        pit_depth,
        formatDate(manufacturing_end_date),
        formatDate(project_end_date),
        id
      ]
    );
        return results

    }

}

export { ProjectModel }