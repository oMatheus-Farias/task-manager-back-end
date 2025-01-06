import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { PrismaService } from '../../prisma.service'
import { UsersRepository } from '../interfaces/users.repository'

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  async findById(userId: string): Promise<User | null> {
    console.log('userId', userId)
    throw new Error('Method not implemented.')
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

  async update(
    userId: string,
    data: Prisma.UserUpdateInput,
  ): Promise<Pick<User, 'id'>> {
    console.log('userId', userId)
    console.log('data', data)
    throw new Error('Method not implemented.')
  }

  async delete(userId: string): Promise<Pick<User, 'id'>> {
    console.log('userId', userId)
    throw new Error('Method not implemented.')
  }
}
