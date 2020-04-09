var db = require("../db/db");
var fs = require("fs");
var util = require("util");
var writeFileAsync = util.promisify(fs.writeFile);

module.exports =  function(app){
    app.get("/api/notes", function(req, res){
        res.json(db)
    });
    app.post("/api/notes", function(req, res){
        var newNote = req.body;
        var lastId = db[db.length - 1] ["id"]
        var newId = lastId + 1;

    newNote ["id"] = newId

    console.log("Req.body: ", req.body);
    db.push(newNote);

    writeFileAsync(".db/db.json", JSON.stringify(db))
    .then(function() {
        console.log("db.json updated")
    });
    res.json(newNote)
    });   

    app.delete("/api/notes/:id", function(req, res) {

        console.log("Req.params:", req.params);
        let chosenId = parseInt(req.params.id);
        console.log(chosenId);


        for (let i = 0; i < db.length; i++) {
            if (chosenId === db[i].id) {
                db.splice(i,1);
                
                let noteJSON = JSON.stringify(db, null, 2);

                writeFileAsync("./db/db.json", noteJSON).then(function() {
                console.log ("Chosen note has been deleted!");
            });                 
            }
        }
        res.json(db);
    });
        }