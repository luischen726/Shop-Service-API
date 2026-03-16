import request from 'supertest'
import path from 'node:path'
import fs from 'fs'

import rootDir from '../../src/util/path'
import app from '../../src/app'


const storePath = path.join(rootDir, 'products.json') 

type productType = {
    title: string,
    imagURL:string,
    description: string,
    price: number
}

const defaultProInfo = {
    title:"default",
    imagURL:"default URL",
    description: "default description",
    price: 1
}


beforeAll(async () =>{
    // adding default data for testing
    await request(app)
    .post('/admin/add-product')
    .send(defaultProInfo)
    
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

// GET => Getting the product in dataBase for editing purpose
describe("GET =>/admin/edit-product", () =>{

    describe("Error: ", () =>{
        test("Forgetting for route parameter", async () =>{
            const sendRequest = await request(app)
            .get("/admin/edit-product")

            expect(sendRequest.statusCode).toEqual(404);
            //response with the product detail
            expect(sendRequest.body).toEqual(expect.objectContaining({
                error: 404,
                data:expect.any(String)
            }))
        })
        test("Not found index product", async () =>{
            const emptyIndex = 1234;

            const sendRequest = await request(app)
            .get(`/admin/edit-product/${emptyIndex}`)

            expect(sendRequest.statusCode).toEqual(400);
            //response with the product detail
            expect(sendRequest.body).toEqual(expect.objectContaining({
                error:400,
                data:`index: ${emptyIndex} does not have product found`
            }))
        })
    })

    test("Response with product detail for editing", async () =>{
        const sendRequest = await request(app)
        .get("/admin/edit-product/0")

        expect(sendRequest.statusCode).toEqual(200);
        //response with the product detail
        expect(sendRequest.body).toEqual(expect.objectContaining({
            title:expect.any(String),
            imagURL:expect.any(String),
            description: expect.any(String),
            price: expect.any(Number)
        }))
    })
})







