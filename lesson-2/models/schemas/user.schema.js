const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({    
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String
})
module.exports = UserSchema