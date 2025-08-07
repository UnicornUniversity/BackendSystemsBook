function findQuestionById(allQuestions, idQuestion) {
    return allQuestions.find((question) => parseInt(question.id) === parseInt(idQuestion));
}

function checkAnswer(allQuestions, idQuestion, answer) {
    let errStr = "";
    // is the answer correct or not
    let result = false;
    if (idQuestion != null && answer != null) {
        const question = findQuestionById(allQuestions, idQuestion);
        if (question != null) {
            result = question.answer.toLowerCase() === answer.toString().toLowerCase();
        } else {
            errStr = "Can't find a question with id " + idQuestion;
        }
    } else {
        errStr = "mandatory data not set";
    }
    return {errStr: errStr, result: result};
}


module.exports.findQuestionById = findQuestionById;
module.exports.checkAnswer = checkAnswer;