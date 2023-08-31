import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
	@IsString()
	email: string

	@IsString()
	@IsOptional()
	password?: string
}
