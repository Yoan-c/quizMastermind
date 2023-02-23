const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Entrer une question pour le quiz"],
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: [true, "Un niveau de difficulté est requis (Easy, Medium, Hard)"],
  },
  category: String,
  correct_answer: {
    type: String,
    required: [true, "Entrer la réponse à cette question"],
    select: false,
  },
  choices: {
    type: [String],
    required: [true, "faite 4 propositions"],
    validate: {
      validator: function (el) {
        return el.length == 4;
      },
      message: "Il doit y avoir exactement 4 propositions",
    },
  },
});

const quiz = mongoose.model("QuizMarvel", quizSchema);

module.exports = quiz;
