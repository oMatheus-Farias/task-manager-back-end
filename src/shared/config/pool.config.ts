import { Pool } from 'pg'

import { env } from './env.config'

export const pool = new Pool({
  user: env.dbUser,
  password: env.dbPassword,
  port: Number(env.dbPort),
  database: env.dbName,
})
