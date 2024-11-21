const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')

const handleLogin = async (req, res) => {
    const { user, password } = req.body
    if (!user || !password) return res.status(400).json({ 'message': 'Username and password required' })
    const foundUser = usersDB.users.find(person => person.username === user)
    if (!foundUser) return res.sendStatus(401) //unauthorized
    //check password
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        //jwt are created once user logs in
        const accessToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' } //15m normally
        )

        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken } //adding refreshtoken to the 'database'
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) //sending HTTPONLY refreshtoken cookie 
        res.json({ 'success': `user ${user} logged in`, 'accessToken': accessToken }) //sending accesstoken
    } else {
        res.sendStatus(401)
    }

}

module.exports = { handleLogin }