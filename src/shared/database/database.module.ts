import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { UsersPrismaRepository } from './repositories/prisma/users.repository'

@Global()
@Module({
  providers: [PrismaService, UsersPrismaRepository],
  exports: [UsersPrismaRepository],
})
export class DatabaseModule {}
