import { Module } from '@nestjs/common'
import { LogActiveDayService } from './log-active-day.service'
import { LogActiveDayController } from './log-active-day.controller'
import { PrismaService } from '../prisma.service'
import { JwtService } from '@nestjs/jwt'

@Module({
	controllers: [LogActiveDayController],
	providers: [LogActiveDayService, PrismaService, JwtService]
})
export class LogActiveDayModule {}
