import fs from 'node:fs'
import rootDir from '../util/path';
import path from 'path';
import sequelize from '../util/database';
import { INTEGER, STRING } from 'sequelize';


const storePath = path.join(rootDir, 'carts.json') 


const cartItem = sequelize.define("cartItem", {
    id: {
        type: INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:INTEGER
})
export default cartItem
