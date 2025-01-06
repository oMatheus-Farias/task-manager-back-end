import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(userId: string): Promise<Pick<User, 'id' | 'name' | 'email'> | null>
  findByEmail(email: string): Promise<Pick<User, 'id'> | null>
  create(data: Prisma.UserCreateInput): Promise<Pick<User, 'id'>>
}
