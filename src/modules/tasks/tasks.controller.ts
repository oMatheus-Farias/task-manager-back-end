import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common'
import { TaskStatus } from '@prisma/client'

import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    await this.tasksService.create(createTaskDto)
    return { message: 'Task created successfully.' }
  }

  @Get()
  findAll() {
    return this.tasksService.findAll()
  }

  @Patch(':taskId')
  async update(
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.tasksService.update(taskId, updateTaskDto)
    return { message: 'Task updated successfully.' }
  }

  @Put(':taskId/status')
  async changeStatus(
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Body() { userId, status }: { userId: string; status: TaskStatus },
  ) {
    await this.tasksService.changeStatus(userId, taskId, status)
    return { message: 'Task status changed successfully.' }
  }

  @Delete(':taskId')
  async remove(
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Body('userId', new ParseUUIDPipe()) userId: string,
  ) {
    await this.tasksService.remove(taskId, userId)
    return { message: 'Task removed successfully.' }
  }
}
