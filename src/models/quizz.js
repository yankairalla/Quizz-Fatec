const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizzSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  answers: [
    {
      answer_text: String,
      course: String
    }
  ]
});

module.exports = mongoose.model("Quizz", quizzSchema);
