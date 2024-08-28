const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if(!user || !pwd) {
        return res.status(400).json({"message": "User name and password are required."});
       
        }
        const foundUser = usersDB.users.find(person => person.username === user);
        if(!foundUser) {
            return res.sendStatus(401); // unauth
    };
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match) {
        return res.status(200).json({"success": `User ${user} is login successfully.`})
    } else {
        res.sendStatus(401)
    }
}

module.exports = { userLogin };