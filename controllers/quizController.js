const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Quiz = require('../models/quizModel')
const User = require('../models/userModel')

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
    const userQuiz = req.user.quiz.filter(el => el.category === category)
    console.log(userQuiz)

    res.status(200).json({
        success: "success",
        data : iscorrect
    })
})

exports.startQuiz = catchAsync(async (req, res, next) => {
    const {category} = req.params;

    const quiz = await Quiz.find({category})
    if (quiz.length === 0)
        return next(new AppError('quiz not found', 404))
    let tabUserQuiz = req.user.quiz;
    const quizStart = tabUserQuiz.filter(el => el.category === category)
    if (quizStart.length === 0 )
    {
        const quizOption = {
            category,
            nbQuestions: quiz.length,
            idQuestion: [],
            info : []
        }
        quizStart.push(quizOption)
        quiz.forEach(el => quizStart[0].idQuestion.push(el.id))

        if (req.user.quiz.length === 0)
            req.user.quiz = quizStart;
        else
            req.user.quiz.forEach(el => { 
                if (el.category === category)
                    el = quizStart
                }
            )
    }
    else {
        quizStart[0].info.forEach(el => el.isAnswer = false)
    }
    const updateUser = await User.findByIdAndUpdate(req.user.id, req.user)
    const url= `${req.protocol}://${req.headers.host}/api/quiz/${category}/${quizStart[0].idQuestion[0]}`
    res.status(200).json({
        success: "success",
        data : {url}
    })
})