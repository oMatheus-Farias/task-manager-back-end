import pg from 'pg'

import { env } from '../../config/env'

const { Pool } = pg

export const pool = new Pool({
  user: env.dbUser,
  password: env.dbPassword,
  port: Number(env.dbPort),
  database: env.dbName,
})

export const PostgresHelper = {
  query: async (query: string, params: any[] = []) => {
    const client = await pool.connect()
    const results = await client.query(query, params)

    return results.rows
  },
}
