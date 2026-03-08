import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use('/add-product', (req,res,next) =>{
    console.log("add product page display")
    res.send(`<html><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add project</button></form></html>`)
    
})

app.use('/product', (req, res, next) =>{
    console.log(req.body)
    res.redirect('/')
})

app.use('/',(req, res, next) => {
    console.log("I am in the middle")
   
    res.send('<h1>Hello world</h1>')
});



app.listen(3000);

