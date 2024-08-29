const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
    const {user, pwd} = req.body;

    if (!user || pwd) return res.status(400).json({"message": 'Username and password are required.'})

    const foundUsers = usersDB.users.find(person => person.username === user);

    if(!foundUsers) return res.sendStatus(401) //unauthorized

    const match = await bcrypt.compare(pwd, foundUsers.password);
    if(match) {
        return res.status(200).json({"success": `User ${user} is login successfully.`})
    } else {
        res.sendStatus(401)
    }
}

module.exports = { userLogin };