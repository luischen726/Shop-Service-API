import { 
    INTEGER,
    STRING
 } from "sequelize";
import sequelize from "../util/database";

const User =  sequelize.define("User", {
    id:{
        type: INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name: STRING,
    email:STRING,
    // account:{
    //     type: STRING,
    //     unique:true,
    //     allowNull:false,
    // },
    // password: {
    //     type: STRING,
    //     unique:true,
    //     allowNull:false,

    // }

})
export default User