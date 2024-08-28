const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const { use } = require('../routes/api/employees');

const registerNewUser = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return res.status(400).json({"message": "User name and password are required."});
    }
    const duplicate = usersDB.users.find(person => person.username === username);
    if(duplicate) return res.sendStatus(409); // conflict in the JSON
    try {
        // encrypt pwd
        const hashPwd = await bcrypt.hash(password, 10);
        // store the new user
        const newUser = {"username": username, "password": hashPwd};

        data.setUsers([...data.users, newUser]);
        
        await fsPromises.writeFIle(path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(data.employees));

        res.status(201).join({"success": `User name ${username} is created.`})

    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports = { registerNewUser };