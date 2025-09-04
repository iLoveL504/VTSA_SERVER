import { UserModel as users } from "../model/UserModel.js"

export const getEmployees = async (req, res) => {
    const results = await users.getAllUsers()
    res.json(results)
}

export const findEmployee = async (req, res) => {
    const results = await users.findById(req.params.id)
    res.json(results)
}

export const updateEmployee = async (req, res) => {
    try{
        const results = await users.updateUser(req.body)
        res.status(200).json({'message': 'user updated'})
    } catch(e) {
        console.log(e)
    }
    
}



