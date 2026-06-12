import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { LoggerModule } from 'nestjs-pino'

import { PrismaModule } from '@/infrastructure/prisma/prisma.module'
import { RedisModule } from '@/infrastructure/redis/redis.module'
import { CategoriesModule } from '@/modules/categories/categories.module'
import { EventsModule } from '@/modules/events/events.module'
import { OutcomesModule } from '@/modules/outcomes/outcomes.module'
import { ObservabilityModule } from '@/observability/observability.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				`.env`
			]
		}),
		ScheduleModule.forRoot(),
		LoggerModule.forRoot({
			pinoHttp: {
				level: process.env.LOG_LEVEL,
				transport: {
					target: 'pino/file',
					options: {
						destination: '/var/log/services/odds/odds.log',
						mkdir: true
					}
				},
				messageKey: 'msg',
				customProps: () => ({
					service: 'odds-service'
				})
			}
		}),
		ObservabilityModule,
		PrismaModule,
		RedisModule,
		CategoriesModule,
		EventsModule,
		OutcomesModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
