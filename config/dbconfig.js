const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SpoonFeedDB',{useNewUrlParser:true})
    .then(()=>console.log("Connection Successful"))
    .catch((err)=>console.log("Error: ",err));