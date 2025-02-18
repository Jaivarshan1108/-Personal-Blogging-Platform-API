const express = require('express');
const connectdb = require('./config/db');
const routrs = require('./routes/articlesroutes');

const app = express();
connectdb();

app.use(express.json())

app.use('/article',routrs);

const port = 2350;

app.listen(port,()=>{
    console.log(`i am alive on ${port}`);
});