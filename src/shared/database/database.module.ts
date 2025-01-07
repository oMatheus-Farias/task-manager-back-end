import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import {
  TasksPrismaRepository,
  UsersPrismaRepository,
} from './repositories/prisma'

@Global()
@Module({
  providers: [PrismaService, UsersPrismaRepository, TasksPrismaRepository],
  exports: [UsersPrismaRepository, TasksPrismaRepository],
})
export class DatabaseModule {}
