import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { PrismaService } from '../../prisma.service'
import { UsersRepository } from '../interfaces/users.repository'

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(
    userId: string,
  ): Promise<Pick<User, 'id' | 'name' | 'email'> | null> {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    })
  }

  async findByEmail(email: string): Promise<Pick<User, 'id'> | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    })
  }

  async create(data: Prisma.UserCreateInput): Promise<Pick<User, 'id'>> {
    return await this.prismaService.user.create({
      data,
      select: { id: true },
    })
  }
}
