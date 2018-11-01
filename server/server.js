var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Recipe} = require('./models/recipe');

var app = express();

app.use(bodyParser.json());

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



app.listen(3000, () => {
    console.log('Program running on port 3000')
});



