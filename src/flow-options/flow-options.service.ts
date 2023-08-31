import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { FlowOptionsDto } from './flow-options.dto'

@Injectable()
export class FlowOptionsService {
	constructor(private prisma: PrismaService) {}

	async update(
		{ sessionCount, flowDuration, breakDuration }: FlowOptionsDto,
		userId: number
	) {
		return this.prisma.flowOptions.update({
			where: {
				userId
			},
			data: {
				sessionCount,
				flowDuration,
				breakDuration
			}
		})
	}

	async get(userId: number) {
		return this.prisma.flowOptions.findUnique({ where: { userId } })
	}
}
