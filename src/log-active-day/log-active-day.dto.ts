import { IsNumber } from 'class-validator'

export class LogActiveDayDto {
	@IsNumber()
	sessionCount: number
}
