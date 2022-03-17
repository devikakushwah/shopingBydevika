const express = require('express');
const multer = require('multer');
var storage = multer.diskStorage(
    {
        destination: 'public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }
);
var upload = multer({ storage: storage });

const Product = require('../model/product.model');
const router = express.Router();

router.post('/add-product',upload.array("product_image"),(request,response) => {
   console.log(request.body);
  Product.create({product_name:request.body.product_name,price:request.body.price,description:request.body.description,
    stock:request.body.stock,
     frontUrl: "http://localhost:3000/images/"+request.files[0].filename,
     backUrl: "http://localhost:3000/images/"+request.files[1].filename,
     leftUrl: "http://localhost:3000/images/"+request.files[2].filename,
     rightUrl: "http://localhost:3000/images/"+request.files[3].filename,
     category_id: request.body.category_id
  }).then(result => {
      console.log(result);
      return response.status(200).json(result);
  }).catch(err => {
      console.log(err);
    return response.status(500).json({err: err.array()});
  });
});

router.post('/view-product',(request,response)=>{
    Product.find().then(result =>{
        return response.status(200).json(result);    
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err: err.array()});
    });
});


router.delete('/delete/:id',(request, response) => {

     Product.deleteOne({_id: request.params.id})
    .then(result=>{
      console.log(result);
       if(result.deletedCount)
        return response.status(202).json({message: 'success'});
       else
        return response.status(204).json({message: 'not deleted'});  
    })
    .catch(err=>{
      return response.status(500).json({message: 'Something went wrong'});
    });
  
  });
  
router.post('/update/:id',upload.array("product_image"),(request,response)=>{
    console.log(request.params.id);
    Product.updateOne({_id:request.params.id},{
      $set:{
        product_name:request.body.product_name,price:request.body.price,description:request.body.description,
        stock:request.body.stock,
         frontUrl: "http://localhost:3000/images/"+request.files[0].filename,
         backUrl: "http://localhost:3000/images/"+request.files[1].filename,
         leftUrl: "http://localhost:3000/images/"+request.files[2].filename,
         rightUrl: "http://localhost:3000/images/"+request.files[3].filename,
         category_id: request.body.category_id
      }
    }).then(result=>{
      if(result.modifiedCount)
             return response.status(204).json({message: 'success'});
               else
                 return response.status(404).json({message: 'record not found'})
    }).catch(err=>{
      return response.status(500).json({message: 'Something went wrong..'});
    });
  });
  
module.exports = router;