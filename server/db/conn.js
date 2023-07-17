const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true})
.then(()=>{
    console.log("DataBase Connected successfully");
})
.catch((error)=>{
    console.log(error.message);
});

