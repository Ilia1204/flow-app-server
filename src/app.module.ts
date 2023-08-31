import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { FlowOptionsModule } from './flow-options/flow-options.module'
import { LogActiveDayModule } from './log-active-day/log-active-day.module'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		FlowOptionsModule,
		LogActiveDayModule,
		UserModule
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
