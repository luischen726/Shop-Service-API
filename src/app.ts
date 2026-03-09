import express from 'express';
import bodyParser from 'body-parser';

const app = express();

import adminRouter from  './routes/admin';
import shopRouter from './routes/shop';


app.use(bodyParser.urlencoded({extended:false}))

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
    res
    .status(404)
    .send("<h1>404 page not found!</h1>")
})




app.listen(3000);

