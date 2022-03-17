
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
  userId:Schema.Types.ObjectId,
  address : String,
  mobile : String,
  order_date : String,
  email: String,
   order_total:Number,
  itemList:[{
        productId:Schema.Types.ObjectId,
        product_name:String,
        total:Number,
        // quantity:Number,
        price:Number
  }]
});
module.exports = mongoose.model("orders",orderSchema);
