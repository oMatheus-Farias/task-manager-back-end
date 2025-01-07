import { Module } from '@nestjs/common'

import { TasksModule, UsersModule } from './modules'
import { DatabaseModule } from './shared/database/database.module'

@Module({
  imports: [UsersModule, DatabaseModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
