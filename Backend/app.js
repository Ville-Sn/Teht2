const express = require("express");
const fs = require("fs");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let dictionary = [];
fillDictionary();

//fill dictionary from dictionary.txt and returns lines
function fillDictionary() {
  //clear existing data
  dictionary = [];

  const data = fs.readFileSync("./Dictionary.txt", {
    encoding: "utf8",
    flag: "r",
  });

  const splitLines = data.split(/\r?\n/);
  splitLines.forEach((line) => {
    const words = line.split(" ");
    const word = {
      fin: words[0],
      eng: words[1],
    };

    dictionary.push(word);
  });
}

//CORS
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  //all for now
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  //GET and POST for now since no other requirements
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

//GET all words
app.get("/words", (req, res) => {
  res.json(dictionary);
});

//GET a word
app.get("/words/:word", (req, res) => {
  const searchedWord = req.params.word;

  const result = dictionary.find((word) => word.fin === searchedWord);

  if (result){
    res.json(result);
  }else
  {
    res.status(404).json({ message: "Not found" });
  }
});

//POST new word
app.post("/words", (req, res) => {
  const word = req.body;
  const newWordPair = `${Object.values(word).join(" ")}`;

  fs.appendFileSync("./Dictionary.txt", "\n" + newWordPair);

  //gets the new version of dictionary
  fillDictionary();
  res.json(dictionary);
});

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
