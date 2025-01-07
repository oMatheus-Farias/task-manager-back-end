import { Injectable } from '@nestjs/common'
import { Prisma, Task } from '@prisma/client'

import { PrismaService } from '../../prisma.service'
import { TasksRepository } from '../interfaces/tasks.repository'

@Injectable()
export class TasksPrismaRepository implements TasksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(taskId: string): Promise<Pick<Task, 'id'> | null> {
    return await this.prismaService.task.findUnique({
      where: { id: taskId },
      select: { id: true },
    })
  }

  async create(data: Prisma.TaskCreateInput): Promise<void> {
    await this.prismaService.task.create({ data })
  }
}
