const mongoose = require('mongoose');
const { feedback } = require('../controllers/userRoute');

/* defining a new schema for user - registration */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    feed: {
        type: String
    },
    choice: {
        type: String
    }
});


/* this line creates a new collection in db named User suffixed by 's' */
const User = new mongoose.model("user", userSchema);

module.exports = User;