import {
	Body,
	Controller,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { FlowOptionsDto } from './flow-options.dto'
import { FlowOptionsService } from './flow-options.service'

@Controller('flow-options')
export class FlowOptionsController {
	constructor(private readonly flowOptionsService: FlowOptionsService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put()
	@Auth()
	async createOrUpdate(
		@CurrentUser('id') userId: number,
		@Body() dto: FlowOptionsDto
	) {
		return this.flowOptionsService.update(dto, userId)
	}

	@Get()
	@Auth()
	async getStatistics(@CurrentUser('id') userId: number) {
		return this.flowOptionsService.get(userId)
	}
}
