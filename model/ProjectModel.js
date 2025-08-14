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
    static async createProject(project){
        const {
            liftName,
            description,
            capacity,
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
        const [ results ] = await pool.query(
            `INSERT INTO projects (lift_name, description, capacity, drive, door_operator, speed,
            control, stops, serving_floor, travel, power_supply, shaft, shaft_size, car_size, door_size,
            overhead_height, pit_depth) values (:liftName, :description, :capacity, :drive, :doorOperator, :speed,
            :control, :stops, :servingFloor, :travel, :powerSupply, :shaft, :shaftSize, :carSize, :doorSize,
            :overheadHeight, :pitDepth)`,
            {
                liftName:  liftName,
                description: description,
                capacity: capacity,
                drive: drive,
                doorOperator: doorOperator,
                speed: speed,
                control: control,
                stops: stops,
                servingFloor: servingFloor,
                travel: travel,
                powerSupply: powerSupply,
                shaft: shaft,
                shaftSize: shaftSize,
                carSize: carSize,
                doorSize: doorSize,
                overheadHeight: overheadHeight,
                pitDepth: pitDepth
            }
        )
       
        return results
    }
}

export { ProjectModel }