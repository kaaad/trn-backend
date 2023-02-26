const mongoose = require('mongoose')

const MONGODB_URL = "mongodb://localhost:27017/naria"

mongoose.connect(MONGODB_URL, (err) => {
    if(err) throw err;
    console.log("Mongodb Connected")
})