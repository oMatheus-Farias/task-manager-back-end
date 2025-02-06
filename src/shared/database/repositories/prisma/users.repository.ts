import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { PgService } from '../../pg.service'
import { PrismaService } from '../../prisma.service'
import { UsersRepository } from '../interfaces/users.repository'

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly pgService: PgService,
  ) {}

  async findById(
    userId: string,
  ): Promise<Pick<User, 'id' | 'name' | 'email'> | null> {
    const result: Pick<User, 'id' | 'name' | 'email'>[] =
      await this.pgService.query(
        `
      SELECT id, name, email
      FROM users
      WHERE id = $1
    `,
        [userId],
      )
    return result[0] || null
  }

  async findByEmail(email: string): Promise<Pick<User, 'id'> | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    })
  }

  async create(data: Prisma.UserCreateInput): Promise<Pick<User, 'id'>> {
    const result: Pick<User, 'id'>[] = await this.pgService.query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
      [data.name, data.email, data.password],
    )

    return result[0]
  }
}
