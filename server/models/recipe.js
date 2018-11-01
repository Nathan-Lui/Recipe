var mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe', {
    recipe_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {Recipe}