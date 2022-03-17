const express = require('express');
const Cart = require('../model/cart.model');
const Product = require('../model/product.model');
const router = express.Router();
router.post('/add-cart',async (request, response) => {
    console.log(request.body);
    var cart = await Cart.findOne({
        userId:request.body.userId
    })
     if(!cart)
      cart = new Cart({userId:request.body.userId});
      
      cart.productList.push(request.body.productId);
      cart.save()
          .then(result => {
              
              return response.status(200).json(result);
          }).catch(err => {
              console.log(err);
              return response.status(500).json({ err: err.array });
          });
    });
router.post('/removeByPid/:productId/:userId',(request, response) => {
    console.log(request.params);
    
   Cart.updateOne({ userId:request.params.userId},{$pullAll:{
       productList:[{ _id:request.params.productId}]
   }})
          .then(result => {
              
              return response.status(200).json(result);
          }).catch(err => {
              console.log(err);
              return response.status(500).json({ err: err.array });
    });
});
//_id using productId
 router.get('/view-cart/:userid',(request,response)=>{
     console.log(request.params.userid);
     Cart.findOne({userId: request.params.userid}).populate("productList").then(result => {
         console.log(result);
         return response.status(200).json(result);
     }).catch(err=>{
         console.log(err);
         return response.status(500).json({err:err.array});
     });
 });

module.exports = router;