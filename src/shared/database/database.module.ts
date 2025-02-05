import { Global, Module } from '@nestjs/common'

import { PgService, PrismaService } from './'
import {
  TasksPrismaRepository,
  UsersPrismaRepository,
} from './repositories/prisma'

@Global()
@Module({
  providers: [
    PgService,
    PrismaService,
    UsersPrismaRepository,
    TasksPrismaRepository,
  ],
  exports: [UsersPrismaRepository, TasksPrismaRepository],
})
export class DatabaseModule {}
