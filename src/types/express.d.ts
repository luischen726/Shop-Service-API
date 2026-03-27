import "express-serve-static-core";
import {Model} from 'sequelize/types'
import user from "../models/user";


declare module "express-serve-static-core" {
  interface Request {
    user?: any
  }
}