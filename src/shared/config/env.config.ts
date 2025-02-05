import 'dotenv/config'

import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsString, validateSync } from 'class-validator'

class Env {
  @IsString()
  @IsNotEmpty()
  databaseUrl: string

  @IsString()
  @IsNotEmpty()
  dbUser: string

  @IsString()
  @IsNotEmpty()
  dbPassword: string

  @IsString()
  @IsNotEmpty()
  dbPort: string

  @IsString()
  @IsNotEmpty()
  dbName: string
}

export const env: Env = plainToInstance(Env, {
  databaseUrl: process.env.DATABASE_URL,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
})

const errors = validateSync(env)

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2))
}
