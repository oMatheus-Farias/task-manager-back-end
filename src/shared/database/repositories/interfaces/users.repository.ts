import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findAll(): Promise<User[]>
  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<Pick<User, 'id'> | null>
  create(data: Prisma.UserCreateInput): Promise<Pick<User, 'id'>>
  update(
    userId: string,
    data: Prisma.UserUpdateInput,
  ): Promise<Pick<User, 'id'>>
  delete(userId: string): Promise<Pick<User, 'id'>>
}
