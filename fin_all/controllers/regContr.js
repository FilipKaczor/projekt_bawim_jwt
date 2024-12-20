const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}
const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { user, password } = req.body
    if (!user || !password) return res.status(400).json({ 'message': 'Username and password required' })
    //check duplicate
    const duplicate = usersDB.users.find(person => person.username === user)
    if (duplicate) return res.status(409).json({ 'message': 'user exists' })
    try {
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        //store the new user
        const newUser = { 'username': user, 'password': hashedPassword }
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users))
        console.log(usersDB.users)
        res.status(201).json({ 'success': `New user ${user} created` })

    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }

}
module.exports = { handleNewUser }