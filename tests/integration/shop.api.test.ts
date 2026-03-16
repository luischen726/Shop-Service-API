import request from 'supertest'
import app from '../../src/app'


// GET => returns all products in database
describe("GET => /shop/",  () =>{
    
    test("", async () =>{
        const result = await request(app)
        .get('/shop/');
        expect(result.statusCode).toEqual(200)
        expect(result.body).toEqual(expect.any(Array))
    })
})





