const express = require('express');
const router = express.Router();
const newUser = require('../../controllers/authController');



router.post('/', newUser.userLogin);

module.exports = router;