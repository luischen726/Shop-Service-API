import { DATE, Model } from "sequelize";
import { 
    INTEGER,
    STRING,
 } from "sequelize";
import sequelize from "../util/database";

export interface UserInstance extends Model {
    id: number;
    email: string;
    password: string;
    resetToken:string;
    resetTimeOut: Date;
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
    password: {
        type: STRING,
        // unique:true,
        allowNull:false,
    },
    resetToken:{
        type:STRING,
        allowNull:true,
        defaultValue:null
    },
    resetTimeOut:{
        type: DATE,
        allowNull:true,
        defaultValue:null
    }

})
export default User