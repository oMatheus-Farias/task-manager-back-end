import { Injectable } from '@nestjs/common'
import { Prisma, Task, TaskStatus } from '@prisma/client'

import { PrismaService } from '../../prisma.service'
import { TasksRepository } from '../interfaces/tasks.repository'

@Injectable()
export class TasksPrismaRepository implements TasksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(taskId: string): Promise<Pick<Task, 'id' | 'userId'> | null> {
    return await this.prismaService.task.findUnique({
      where: { id: taskId },
      select: { id: true, userId: true },
    })
  }

  async create(data: Prisma.TaskCreateInput): Promise<void> {
    await this.prismaService.task.create({ data })
  }

  async update(data: Prisma.TaskUpdateInput): Promise<void> {
    await this.prismaService.task.update({
      where: { id: data.id as string },
      data,
    })
  }

  async changeStatus(taskId: string, status: TaskStatus): Promise<void> {
    await this.prismaService.task.update({
      where: { id: taskId },
      data: { status },
    })
  }
}
