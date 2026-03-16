import fs from 'node:fs'
import rootDir from '../util/path';
import path from 'path';

type titleData  =  {title: string};
const projects: titleData[] = [];

const storePath = path.join(rootDir, 'products.json') 

function getDataFromJson(cb: any) {
    fs.readFile(storePath,'utf-8',(err, fileContent) =>{
        if (!err && typeof fileContent === 'string'){
            cb(JSON.parse(fileContent)) 
        }else {
            cb([])
        }
    })
} 

export default class Product {
    title: string;
    imagURL: string;
    description: string;
    price: number;
    constructor(t: string, imagURL: string, description: string, price: number){
        this.title = t;
        this.imagURL = imagURL;
        this.description = description;
        this.price = price;
    }   
    
    save(cb:any): undefined{
        getDataFromJson((data: object[]) =>{  
            data.push(this)
            fs.writeFile(storePath, JSON.stringify(data),  (err ) =>{
                if (err) return cb(err);
                cb(null)
            })
        })
    }

    static fetchAll(cb: any): undefined{
        getDataFromJson((data:object[]) =>{
            cb(data)
        })
    }
    static fetchOne (idex: number, cb:any): undefined{
        getDataFromJson((data:object[]) => {
            if (data[idex]) return cb(data[idex])
            cb("the data not found!!")
        })
    }
}