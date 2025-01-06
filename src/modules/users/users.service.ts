import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { UsersPrismaRepository } from 'src/shared/database/repositories/prisma/users.repository'

import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersPrismaRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      createUserDto.email,
    )

    if (userAlreadyExists) {
      throw new ConflictException('User already exists.')
    }

    const passwordHash = await hash(createUserDto.password, 12)
    createUserDto.password = passwordHash

    return await this.usersRepository.create(createUserDto)
  }
}
