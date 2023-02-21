const mongoose = require("mongoose");
const fs = require("fs");
const dotEnv = require("dotenv");
const quizModel = require("../models/quizModel");

dotEnv.config({ path: "config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    console.log("connexion reussi");
  })
  .catch((err) => {
    console.log(err);
  });

let fichier = fs.readFileSync(`${__dirname}/quizzMarvel.json`, "utf8");
let fichierPotter = fs.readFileSync(`${__dirname}/quizzHarryPotter.json`, "utf8");

const MarverQuiz = JSON.parse(fichier);
const PotterQuiz = JSON.parse(fichierPotter);

const ImportData = async () => {
  try {
    await quizModel.create(MarverQuiz);
    await quizModel.create(PotterQuiz);
    console.log("DATA IMPORTED");
  } catch (err) {
    console.log(`error import data: ${err}`);
  }
  process.exit();
};

const DeleteData = async () => {
  try {
    await quizModel.deleteMany();
    console.log("DATA DELETED");
  } catch (err) {
    console.log(`error import data: ${err}`);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  ImportData();
} else if (process.argv[2] === "--delete") {
  DeleteData();
}
