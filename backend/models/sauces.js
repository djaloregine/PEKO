const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainPepper: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,

    },
    heat: {
        type: Number,
        min: 0,
        max: 10
    },
    likes: {
        type: Number,
        min: 0
    },
    dislikes: {
        type: Number,
        min: 0
    },
    usersLiked: {
        type: Array,
        required: true
    },
    usersDisLiked: {
        type: Array,
        required: true
    },
});

module.exports = mongoose.model('Sauce', sauceSchema);