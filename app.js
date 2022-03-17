const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const categoryRouter = require('./routes/category.route');
const adminRouter = require('./routes/admin.route');
const productRouter = require('./routes/product.route');
const orderRouter = require('./routes/order.route');
const cartRouter = require('./routes/cart.route');
mongoose.connect("mongodb+srv://devikakushwah:Radhakrishna%4029@practice.7o13k.mongodb.net/Mongoose_API");

const userRouter = require('./routes/index.route');
const app = express();
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/order',orderRouter);
app.use('/cart',cartRouter)
app.use('/product',productRouter);
app.use('/category',categoryRouter);
app.use('/admin',adminRouter);
app.use(userRouter);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("server running");
})