

import dotenv from "dotenv/config"
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './util/database';

const app = express();

import adminRouter from  './routes/admin';
import shopRouter from './routes/shop';

import {page404} from './controllers/pageNotFound'

// app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/admin', adminRouter);
app.use('/shop',shopRouter);

app.use(page404)

sequelize.sync()
.then(result =>{
    console.log(result)
})
.catch(err => console.log(err))

export default app


// app.listen(3000);

