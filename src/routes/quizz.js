const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const quizzController = require('../controllers/quizz');

router.get('/user', userController.getFormUser);

router.post('/user', userController.postFormUser);

router.get('/quizz', quizzController.getQuizz);

module.exports = router;
