import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

export const db = new Sequelize(process.env.DATABASE_URL as string, {
    models: [path.resolve(__dirname, '..', 'models', '**', '*')],
    logging: false,
    dialectOptions: isProduction
        ? {
              ssl: {
                  require: true,
                  rejectUnauthorized: false
              }
          }
        : {}
})