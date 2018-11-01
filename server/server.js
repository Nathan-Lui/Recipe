var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Recipe} = require('./models/recipe');

var app = express();

app.use(bodyParser.json());

// POST REQUESTS
app.post('/recipes', (req, res) => {
    var recipe = new Recipe({
        recipe_name: req.body.recipe_name
    });
    recipe.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET REQUESTS
app.get('/recipes', (req, res) => {
    Recipe.find().then((recipes) => {
        res.send({recipes});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /recipes/id

app.get('/recipes/:id', (req, res) => {
    Recipe.find().then((recipes) => {
        var id = req.params.id;

        if(!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        Recipe.findById(id).then((recipe) => {
            if (!recipe){
                return res.status(404).send();
            }
            else {
                res.send({recipe});
            }
        }).catch((e) => {
            res.status(400).send();
        })
    });
});

// DELETE /recipes/id
app.delete('/recipes/:id', (req, res) => {
    Recipe.find().then((recipes) => {
        var id = req.params.id;

        if(!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        Recipe.findByIdAndRemove(id).then((recipe) => {
            if (!recipe){
                return res.status(404).send();
            }
            res.send({recipe});
        }).catch((e) => {
            res.status(400).send();
        })
    });
});
app.listen(3000, () => {
    console.log('Program running on port 3000')
});

module.exports = {app};


