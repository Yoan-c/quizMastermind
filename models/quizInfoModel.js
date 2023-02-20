const mongoose = require("mongoose");

const quizInfoSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Entrer une catégorie pour le quiz"],
  },
  description: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: [true, "Entrer une description pour le quiz"],
  },
  image: {
    type: String,
    required: [true, "Entrer une image pour le quiz"],
  },
});

const quiz = mongoose.model("Quiz", quizInfoSchema);

module.exports = quiz;
