import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from '../auth/auth.decorator'
import { CurrentUser } from '../auth/user.decorator'
import { LogActiveDayDto } from './log-active-day.dto'
import { LogActiveDayService } from './log-active-day.service'

@Controller('log-active-day')
export class LogActiveDayController {
	constructor(private readonly logActiveDayService: LogActiveDayService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createOrUpdate(
		@CurrentUser('id') userId: number,
		@Body() dto: LogActiveDayDto
	) {
		return this.logActiveDayService.createOrUpdate(dto, userId)
	}

	@Get('statistics')
	@Auth()
	async getStatistics(@CurrentUser('id') userId: number) {
		return this.logActiveDayService.getStatistics(userId)
	}
}
