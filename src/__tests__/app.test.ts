import request from 'supertest'

import app from '../app'




describe("Error handling", () => {
    test("Page not found", async () =>{
        await request(app)
        .get("/dfjaosdfnoasdnf")
        .set('Accept', "application/json")
        .expect(404)
        .expect('Content-Type', /json/)


        
    })
})


