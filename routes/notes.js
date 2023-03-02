// Importing packages
const fs = require("fs");
const route = require("express").Router();

// Require the JSON file and assign it to a variable called `dataBase`
let dataBase = require("../db/db.json");

route.get("/notes", (req, res) => { res.json(dataBase); });

route.post("/notes", (req, res) => {
    const postNote = req.body;
    postNote.id = Date.now(); //provide unique value
    dataBase.push(postNote);
    fs.writeFile("./db/db.json", JSON.stringify(dataBase), err => {
        if (err) throw err;
        res.json(postNote);
    });
});

route.delete("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const i = dataBase.findIndex(note => note.id === id); // finds when unique value occurs
    console.log(i)
    if (i >= 0) {
        dataBase.splice(i, 1);
        fs.writeFile("./db/db.json", JSON.stringify(dataBase), err => {
            if (err) throw err;
            res.sendStatus(200); //need this or page will not update correctly
        });
    };
});

module.exports = route;