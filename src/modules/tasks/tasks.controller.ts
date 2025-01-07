import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id)
  }
}