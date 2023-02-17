const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.index = (req, res, next) => {
    res.render(`${__dirname}/../view/pages/index`, {
        title : "Quiz Mastermind"
    });

}