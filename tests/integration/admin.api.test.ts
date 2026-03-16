

import request from 'supertest'
import app from '../../src/app'
import rootDir from '../../src/util/path'
import path from 'node:path'
import fs from 'fs'

const storePath = path.join(rootDir, 'products.json') 


beforeAll(() =>{

})
afterAll(() =>{
    //remove the generate file from test
    fs.unlinkSync(storePath)
})

// POST => Adding new product to database
describe("POST => /admin/add-product",() =>{
    test("add new product to database",  async()=>{
        const newProInfo = {
            title:"new product",
            imagURL:"fake URL",
            description: "fake description",
            price: 100
        }
        const sendRequest  = await request(app)
        .post('/admin/add-product')
        .send(newProInfo)

        expect(sendRequest.statusCode).toEqual(200)
        expect(sendRequest.body).toEqual(expect.arrayContaining([expect.objectContaining(newProInfo)]))
        
    })
})

// GET => Getting all the products in dataBase
describe("GET =>/admin/add-product", () =>{
    test("", async () =>{
        const sendRequest = await request(app)
        .get("/admin/add-product")

        expect(sendRequest.statusCode).toEqual(200);
        expect(sendRequest.body).toEqual(expect.arrayContaining([expect.objectContaining({
            title:expect.any(String),
            imagURL:expect.any(String),
            description: expect.any(String),
            price: expect.any(Number)
        })]))
    })
})


// // GET => returns all products in database
// describe("GET => /shop/",  () =>{
    
//     test("", async () =>{
//         const result = await request(app)
//         .get('/shop/');
//         expect(result.statusCode).toEqual(200)
//         expect(result.body).toEqual(expect.any(Array))
//     })
// })





