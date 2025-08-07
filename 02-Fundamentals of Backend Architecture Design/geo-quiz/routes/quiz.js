const express = require("express");
const dml = require("../data/dataManagementLayer");
const quizProcessor = require("../bl/quizProcessor");

const router = express.Router();

router.get("/question", async (req, res, next) => {
    const allQuestions = await dml.readQuestions();
    const idQuestion = parseInt(Math.floor(Math.random() * allQuestions.length) + 1);
    const question = quizProcessor.findQuestionById(allQuestions, idQuestion);
    res.json({id: idQuestion, text: question.question});
});

router.post("/answer", async (req, res, next) => {
    const idQuestion = req.body.idQuestion;
    const answer = req.body.answer;
    const allQuestions = await dml.readQuestions();
    const output = quizProcessor.checkAnswer(allQuestions, idQuestion, answer);
    res.json(output);
});

module.exports = router;