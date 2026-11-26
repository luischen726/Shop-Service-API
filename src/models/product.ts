import fs from 'node:fs'
import rootDir from '../util/path';
import path from 'path';
import sequelize from '../util/database'
import { Model } from "sequelize";

import { 
    DOUBLE,
    INTEGER,
    STRING
}  from 'sequelize';

const storePath = path.join(rootDir, 'products.json') 

export interface ProductInterface extends Model {
    id: number;
    title: string;
    price: number;
    imageURL: string;
    description: string;
}

const Product = sequelize.define<ProductInterface>("product", {
    id:{
        type:INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:STRING,
    price:{
        type:DOUBLE,
        allowNull:false
    },
    imageURL:{
        type:STRING,
        allowNull:false
    },
    description:{
        type:STRING,
        allowNull:false
    }
})

export default Product