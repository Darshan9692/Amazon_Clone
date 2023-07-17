//please include env
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("./db/conn");
const cookieParser = require("cookie-parser");

const Products = require('./models/productSchema');
const DefaultData = require("./defaultdata");
const cors = require('cors');
const router = require("./routes/router");
const port = process.env.PORT || 8000;


app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});


DefaultData();