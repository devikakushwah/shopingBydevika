const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    mobile:Number,
    age:Number,
    email:String,
    password:String
});
module.exports = mongoose.model('users', userSchema);