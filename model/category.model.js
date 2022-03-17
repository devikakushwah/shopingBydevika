const mongoose = require('mongoose');
const categorySchema =  new mongoose.Schema({
    category_name:String,
    category_image:String
});
module.exports = mongoose.model("categories",categorySchema);