import 'dotenv/config'
import { Sequelize } from 'sequelize'

const sequelize  = new Sequelize(
    process.env.MYSQL_DATABASE? process.env.MYSQL_DATABASE : "",
    process.env.MYSQL_USER? process.env.MYSQL_USER : "",
    process.env.MYSQL_PASSWORD? process.env.MYSQL_PASSWORD : "",
    {
        dialect:"mysql",
        host:'localhost',
        port: process.env.MYSQL_PORT? +process.env.MYSQL_PORT: 3306
    }
)

export default sequelize