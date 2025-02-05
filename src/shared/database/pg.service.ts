import { Injectable } from '@nestjs/common'

import { pool } from '../config/pool.config'

@Injectable()
export class PgService {
  async query(query: string, params: any[] = []) {
    const client = await pool.connect()
    try {
      const results = await client.query(query, params)
      return results.rows
    } catch (error) {
      console.error('Database query error:', error)
      throw error
    } finally {
      client.release()
    }
  }
}
