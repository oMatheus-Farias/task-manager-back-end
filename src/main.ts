import { ExpressAuth } from '@auth/express'
import Credentials from '@auth/express/providers/credentials'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const expressApp = app.getHttpAdapter().getInstance()

  app.useGlobalPipes(new ValidationPipe())
  expressApp.set('trust proxy', true)
  app.use(
    '/auth/*',
    ExpressAuth({
      providers: [Credentials({})],
    }),
  )

  await app.listen(process.env.PORT ?? 8080)
}
bootstrap()
