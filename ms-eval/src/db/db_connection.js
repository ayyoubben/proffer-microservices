const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,(err) =>{ if(err) console.log(err) 
else console.log("mongo is connected!");})
