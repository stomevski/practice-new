const express = require('express');
const authRouter = require('./routes/authRoutes');
require('dotenv').config();

require('./db');

const app = express();

app.use(express.json());

app.use('/api/v1', authRouter);


const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {

    if (!err) {
        console.log(`Server started at port ${PORT}`);
        return;
    }

    console.log(`Server failed to start on port ${PORT}`);

})