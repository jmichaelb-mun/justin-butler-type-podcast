
import express from "express";
import fs from "fs";
import { v4 } from "uuid";

const router = express.Router();

function addScore(req, res){
    const { name, score } = req.body;
    const newScore = {
        id: v4(),
        name,
        score
    }
    const file = fs.readFileSync("./data/HighScores.json");
    const scores = JSON.parse(file);
    scores.push(newScore);
    scores.sort((a,b) =>(a.score < b.score ? 1:-1));
    fs.writeFileSync("./data/HighScores.json", JSON.stringify(scores));
    res.status(200).send("Added new score");
}

function getScores(_req, res){
    const file = fs.readFileSync("./data/HighScores.json");
    const scores = JSON.parse(file);
    res.status(200).send(scores);
}

router.route("/").get(getScores).post(addScore);
export default router;
