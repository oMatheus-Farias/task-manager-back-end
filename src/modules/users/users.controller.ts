import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { FindByIdDto } from './dto/find-by-id.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me/:userId')
  @HttpCode(HttpStatus.OK)
  async findById(@Param() findByIdDto: FindByIdDto) {
    return await this.usersService.findById(findByIdDto.userId)
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto)
    return {
      message: 'User created successfully.',
    }
  }
}
