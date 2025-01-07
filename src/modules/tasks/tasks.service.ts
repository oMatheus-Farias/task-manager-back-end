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

  findAll() {
    return `This action returns all tasks`
  }

  findOne(id: number) {
    return `This action returns a #${id} task`
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto)
    return `This action updates a #${id} task`
  }

  remove(id: number) {
    return `This action removes a #${id} task`
  }
}
