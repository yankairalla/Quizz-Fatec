const express = require('express');

const router = express.Router();

const quizzController = require('../controllers/quizz');

router.get('/', quizzController.getIndex);

router.post('/', quizzController.postUser);

router.get('/quizz', quizzController.getQuizz);

router.post('/quizz', quizzController.postQuizz);

module.exports = router;
