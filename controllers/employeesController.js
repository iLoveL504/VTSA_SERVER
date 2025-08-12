import { UserModel as users } from "../model/UserModel.js"

const getEmployees = async (req, res) => {
    const results = await users.getAllUsers()
    res.json(results)
}

const findEmployee = async (req, res) => {
    const results = await users.findById(req.params.id)
    res.json(results)
}


export {
    getEmployees,
    findEmployee,
}


