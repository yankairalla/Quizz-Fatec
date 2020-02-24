const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/user', userController.getFormUser);

router.post('/user', userController.postFormUser);

module.exports = router;
