const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Quiz = require('../models/quizModel')


exports.getAll = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.find();
    res.status(200).json({
        success: "success",
        count: quiz.length,
        data: quiz
    })
})

exports.getOneQuestion = catchAsync(async (req, res, next) => {
    const {category, id} = req.params;
    if (!category && !id) {
        return next(new AppError('categorie and id sont requis', 400))
    }
    const quiz = await Quiz.findById(id)
    if (!quiz)
    return next(new AppError('quiz not found', 404))
    res.status(200).json({
        success: "success",
        data : quiz
    })
})

exports.answerQuestion = catchAsync(async (req, res, next) => {
    const {category, id} = req.params;
    const {answer} = req.body;
    let iscorrect = false;

    if (!answer) {
        return next(new AppError('Une réponse est requise', 400))
    }
    const quiz = await Quiz.findById(id,'+correct_answer')
    if (!quiz)
    return next(new AppError('quiz not found', 404))
    if (quiz.correct_answer === answer) {
        iscorrect = true;
    }
    res.status(200).json({
        success: "success",
        data : iscorrect
    })
})