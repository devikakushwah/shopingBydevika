const express = require('express');
const { request } = require('https');
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

const Category = require('../model/category.model');
const router = express.Router();

router.post('/add-category',upload.single("category_image"),(request,response) => {
   
  Category.create({category_name:request.body.category_name, category_image: "http://localhost:3000/images/"+request.file.filename
  }).then(result => {
      return response.status(200).json(result);
  }).catch(err => {
    return response.status(500).json({err: err.array()});
  });
});

router.post('/view-category',(request,response) => {
    Category.find().then(result=>{
        return response.status(200).json(result);
    }).catch(err => {
      return response.status(500).json({err: err.array()});
    });
    
});

router.delete('/delete/:id',(request, response) => {

  Category.deleteOne({_id: request.params.id})
  .then(result=>{
    console.log(result);
    // if(result.deletedCount)
    //   return response.status(202).json({message: 'success'});
    // else
      return response.status(204).json({message: 'not deleted'});  
  })
  .catch(err=>{
    return response.status(500).json({message: 'Something went wrong'});
  });

});

router.post('/update/:id',upload.single("category_image"),(request,response)=>{
  console.log(request.params.id);
  Category.updateOne({_id:request.params.id},{
    $set:{
      category_name:request.body.category_name,
      category_image:"http://localhost:3000/images/"+ request.file.filename
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