import { Prisma, Task, TaskStatus } from '@prisma/client'

export interface TasksRepository {
  findById(taskId: string): Promise<Pick<Task, 'id' | 'userId'> | null>
  create(data: Prisma.TaskCreateInput): Promise<void>
  update(data: Prisma.TaskUpdateInput): Promise<void>
  changeStatus(taskId: string, status: TaskStatus): Promise<void>
  remove(taskId: string): Promise<void>
}
