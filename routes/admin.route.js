const express = require('express');
const Admin = require('../model/admin.model');
const router = express();


router.post('/signup', (request, response) => {
    console.log(request.body);
    Admin.create(request.body).then(result => {
        console.log(result)
        return response.status(201).json(result);
    }).catch(errors => {
        
        return response.status(500).json({errors: errors.array()});
    });
});

router.post('/signin', (request, response) => {
    Admin.findOne(request.body).then(result => {
        console.log(result);
        return response.status(201).json(result);
    }).catch(errors => {
        console.log(errors);
        return response.status(500).json({errors: errors.array()});
    });
});

module.exports = router;