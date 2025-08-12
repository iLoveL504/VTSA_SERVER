import jwt from 'jsonwebtoken'
import { UserModel as users } from '../model/UserModel.js'

export const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password required' })
    const results = await users.getAllUsers()
    const foundUser = results.find(users => users.username === user)
    console.log(foundUser)
    console.log(pwd)
    if (!foundUser) return res.status(404).json({ 'message': 'User not found' })
    if (foundUser.password !== pwd) return res.status(401).json({ 'message': 'Unauthorized'})
    
   

    if (foundUser) {
        const roles = foundUser.job
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30sec' }
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        //Saving refreshToken with current user (mysql code)

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken, roles })
        console.log('user has login')
    }
    // try{
    // const [ results, fields ] = await pool.query(
    //     'SELECT * FROM employees'
    // )
    
    // res.json(results)
    // console.log(req)
    // } catch (err) {
    //     console.log(err)
    // }
}












