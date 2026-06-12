import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PinoLogger } from 'nestjs-pino'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class EventsScheduler {
	constructor(
		private readonly logger: PinoLogger,
		private readonly prismaService: PrismaService
	) {
		this.logger.setContext(EventsScheduler.name)
	}

	@Cron(CronExpression.EVERY_MINUTE)
	async resolveBets() {
		const now = new Date()

		await this.prismaService.event.updateMany({
			where: {
				end: { lte: now },
				status: { not: 'FINISHED' }
			},
			data: {
				status: 'FINISHED'
			}
		})
		this.logger.info('All bets has been set to finished status')
	}
}
