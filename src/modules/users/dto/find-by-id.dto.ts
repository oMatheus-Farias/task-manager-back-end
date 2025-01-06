import { IsUUID } from 'class-validator'

export class FindByIdDto {
  @IsUUID()
  userId: string
}
