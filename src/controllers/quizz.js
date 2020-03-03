const questions = require("../question");

const Quizz = require('../models/quizz')

exports.getIndex = async (req, res, next) => {
  res.render("index.ejs");
};

exports.getQuizz = async (req, res, next) => {
  const random = (start, end) => {
    const arr = [];
    for (let count = start - 1; count < end; count++) {
      let val = Math.floor(Math.random() * (end - start + 1) + start);
      if (arr.includes(val)) {
        count--;
      } else {
        arr.push(val);
      }
    }
    return arr;
  };

  const generateQuizz = questions => {
    const questionary = [];

    questions.map(({title, answers }) => {
      const obj = {
        title,
        answers: answers.map(({ course, answer_text }) => ({ course, answer_text }) )
      };
      return questionary.push(obj);
    });
    console.log(JSON.stringify(questionary, null, 2));
    res.render("quizz.ejs", {
      questionary
    });
  };

  quizzes = await Quizz.find()
  console.log(quizzes)
  generateQuizz(quizzes);
};
