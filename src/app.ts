import express from 'express';
import bodyParser from 'body-parser';

const app = express();

import adminRouter from  './routes/admin';
import shopRouter from './routes/shop';

import {page404} from './controllers/pageNotFound'

// app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/admin', adminRouter);
app.use('/shop',shopRouter);

app.use(page404)




app.listen(3000);

