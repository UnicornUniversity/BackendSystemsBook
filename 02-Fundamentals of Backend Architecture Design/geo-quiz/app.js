// npm install
// run it: npm start
// http://localhost:3001/health

const express = require("express");

const app = express();

//for your reference if you submit FormData (key-value dictionary)
//const bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({extended: true}));

app.get("/health", (req, res, next) =>{
    res.send("<h1>Service is OK!</h1>");
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

app.use("/quiz", require("./routes/quiz"));

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});