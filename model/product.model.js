const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    product_name:String,
    price:Number,
    description:String,
    stock:Number,
    frontUrl:String,
    backUrl:String,
    leftUrl:String,
    rightUrl:String,
    category_id: Schema.Types.ObjectId
    //  cart
   
});
module.exports = mongoose.model('products', productSchema);