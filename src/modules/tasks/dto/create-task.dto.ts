import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  name: string

  @IsEnum(['MORNING', 'AFTERNOON', 'NIGHT'])
  @IsNotEmpty()
  hour: string

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string

  @IsUUID()
  userId: string
}
