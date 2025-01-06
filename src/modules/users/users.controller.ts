import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto)
    return {
      message: 'User created successfully.',
    }
  }
}
