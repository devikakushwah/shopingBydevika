const express = require('express');
const Order = require('../model/order.model');
const Cart = require('../model/cart.model');
const router = express();
router.post('/add-order/:cid', (request, response) => {
    console.log(request.params.cid);
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {

        mm = '0' + mm;
    }
    today = yyyy + '/' + mm + '/' + dd;
    request.body.date = today;
    var quantity = request.body.quantity;
    Cart.findOne({ _id: request.params.cid }).populate("productList").then(result => {
        console.log(result);
        var uId = result.userId;
        var sum=0;
        console.log(uId);
        for (i = 0; i < result.productList.length; i++) {
            const productPrice = result.productList[i].price;
             sum = sum + productPrice * quantity;
           }

        const order = new Order({
            userId: uId, email: request.body.email, address: request.body.address,
            mobile: request.body.mobile, order_date: today,order_total:sum
        });

        for (i = 0; i < result.productList.length; i++) {

            const pId = result.productList[i]._id;
            const productName = result.productList[i].product_name;
            const productPrice = result.productList[i].price;
            var sum = productPrice * quantity;
            order.itemList.push({ productId: pId, product_name: productName, price: productPrice, total: sum });
        }

        order.save()
            .then(result => {

                return response.status(200).json(result);
            }).catch(err => {
                console.log(err);
                return response.status(500).json({ err: err.array });
            });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ err: err.array });
    });

})
module.exports = router;