import { Module } from '@nestjs/common'
import { FlowOptionsService } from './flow-options.service'
import { FlowOptionsController } from './flow-options.controller'
import { PrismaService } from '../prisma.service'

@Module({
	controllers: [FlowOptionsController],
	providers: [FlowOptionsService, PrismaService]
})
export class FlowOptionsModule {}
