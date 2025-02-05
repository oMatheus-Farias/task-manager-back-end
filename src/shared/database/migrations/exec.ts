import { readFileSync } from 'fs'
import { join } from 'path'

import { pool } from '../pg-config/pg-helper'

async function execMigration() {
  const client = await pool.connect()

  try {
    const filePath = join(__dirname, '00-init.sql')
    const script = readFileSync(filePath, 'utf-8')

    await client.query(script)
    console.log('Migration executed successfully')
  } catch (error) {
    console.error(error)
  } finally {
    client.release()
  }
}

execMigration()
