const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

const apiLimiter = require('../middleware/apiLimiter')


router.post("/signup", apiLimiter, userController.signup);

router.post('/login', apiLimiter, userController.login);

module.exports = router;