import fs from 'fs'
import path from 'path'

async function execMigration() {
  const client = await this.pool.connect()

  try {
    const filePath = path.join(__dirname, '00-init.sql')
    const script = fs.readFileSync(filePath, 'utf-8')

    await client.query(script)
    console.log('Migration executed successfully')
  } catch (error) {
    console.error(error)
  } finally {
    client.release()
  }
}

execMigration()
