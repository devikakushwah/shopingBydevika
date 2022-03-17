const express = require('express');
const User = require('../model/user.model');
const router = express();

router.post('/signup', (request, response) => {
User.create(request.body).then(result => {
    return response.status(201).json(result);
}).catch(errors => {
    return response.status(500).json({errors: errors.array()});
});
});
router.post('/signin',(request,response) => {
    User.findOne(request.body).then(result => {
        console.log(result);
        return response.status(200).json(result);
    })
    .catch(errors => {
        return response.status(500).json({errors: errors.array()});

    });
})
module.exports =router;