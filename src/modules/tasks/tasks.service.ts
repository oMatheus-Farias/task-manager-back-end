import { ConflictException, Injectable } from '@nestjs/common'
import { TaskHours } from '@prisma/client'
import { TasksPrismaRepository } from 'src/shared/database/repositories/prisma/tasks.repository'
import { UsersPrismaRepository } from 'src/shared/database/repositories/prisma/users.repository'

import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksPrismaRepository,
    private readonly usersRepository: UsersPrismaRepository,
  ) {}

  findAll() {
    return `This action returns all tasks`
  }

  async create(createTaskDto: CreateTaskDto) {
    const userExists = await this.usersRepository.findById(createTaskDto.userId)

    if (!userExists) {
      throw new ConflictException('User not found.')
    }

    await this.tasksRepository.create({
      name: createTaskDto.name,
      description: createTaskDto?.description,
      hour: createTaskDto.hour as TaskHours,
      user: {
        connect: { id: createTaskDto.userId },
      },
    })
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto) {
    const userExists = await this.usersRepository.findById(updateTaskDto.userId)

    if (!userExists) {
      throw new ConflictException('User not found.')
    }

    const taskExists = await this.tasksRepository.findById(taskId)

    if (!taskExists) {
      throw new ConflictException('Task not found.')
    }

    const userIsOwner = taskExists.userId === updateTaskDto.userId

    if (!userIsOwner) {
      throw new ConflictException('User is not the owner of this task.')
    }

    await this.tasksRepository.update({
      id: taskId,
      name: updateTaskDto.name,
      description: updateTaskDto?.description,
      hour: updateTaskDto.hour as TaskHours,
    })
  }

  remove(id: number) {
    return `This action removes a #${id} task`
  }
}
