import { Prisma, Task } from '@prisma/client'

export interface TasksRepository {
  findById(taskId: string): Promise<Pick<Task, 'id'> | null>
  create(data: Prisma.TaskCreateInput): Promise<void>
}
