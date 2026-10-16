import { Model } from "sequelize";
import { 
    INTEGER,
    STRING,
 } from "sequelize";
import sequelize from "../util/database";

export interface UserInstance extends Model {
    id: number;
    email: string;
    password: string;
}

const User =  sequelize.define<UserInstance>("User", {
    id:{
        type: INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    // name: STRING,
    email:{
        type:STRING,
        allowNull:false,
        
    },
    // account:{
    //     type: STRING,
    //     unique:true,
    //     allowNull:false,
    // },
    password: {
        type: STRING,
        // unique:true,
        allowNull:false,

    }

})
export default User