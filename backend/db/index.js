const mongoose = require('mongoose');


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@stefan-semos.rguax.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, (err) => {

    if (!err) {
        console.log("Connected to mongoose");
    } else {
        console.log(err.message);
    }


})