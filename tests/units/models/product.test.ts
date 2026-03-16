import path from 'path'
import fs from 'fs'
import rootDir from '../../../src/util/path';
import Product from "../../../src/models/product";

const storePath = path.join(rootDir, 'products.json') 


type proType = {
    title: string,
    imagURL: string,
    description: string,
    price:number
}

let motherShip: Product;
let currentDataSet:proType[]
beforeAll((done) =>{
    motherShip = new Product(
        "fake product", 
        "fake imagURL",
        "fake description",
        100
    )
    motherShip.save(done)


})
afterAll(() =>{
    //remove the generate file from test
    fs.unlinkSync(storePath)
})

describe("constructor", () =>{
    test("Checks Initial value", () =>{
        expect(motherShip).toHaveProperty("title", "fake product")
        expect(motherShip).toHaveProperty("imagURL", "fake imagURL")
        expect(motherShip).toHaveProperty("description", "fake description")
        expect(motherShip).toHaveProperty("price", 100)


    })
})

//save save product into JSON
describe("save",() =>{
    
    test("save the data", (done) =>{
        const newPro = new Product("title","imagURL", "description", 100);
        newPro.save((err:null| Error) =>{
            expect(err).toBeNull()
            Product.fetchAll((newData:proType[]) =>{
                expect(newData.length).toEqual(2)
                const n = newData[newData.length - 1]
                expect(n.title).toEqual("title")
                expect(n.imagURL).toEqual("imagURL")
                expect(n.description).toEqual("description")
                expect(n.price).toEqual(100)
                done()
            })

        })
    })
})

//fetchAll fetch all the data in the JSON
describe("fetchAll", () =>{
    test("returns data", (done) =>{
        Product.fetchAll((currentData: proType[]) =>{
            expect(currentData).toEqual(expect.arrayContaining([{
                title:expect.any(String),
                imagURL:expect.any(String),
                description:expect.any(String),
                price:expect.any(Number),
            }]))
            done()
        })
    })
})

//fetchOne fetch data according to index from JSON
describe("fetchOne", () =>{
    test("Returns data", (done) => {
        const i = 0 // index of default data from setup 
        Product.fetchOne(0, (theData:proType) =>{
            expect(theData).toEqual({
                title:expect.any(String),
                imagURL:expect.any(String),
                description:expect.any(String),
                price:expect.any(Number),
            });
            done();
        })
    })
})