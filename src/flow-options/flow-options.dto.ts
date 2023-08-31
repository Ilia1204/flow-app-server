import { IsNumber } from 'class-validator'

export class FlowOptionsDto {
	@IsNumber()
	flowDuration: number

	@IsNumber()
	breakDuration: number

	@IsNumber()
	sessionCount: number
}
