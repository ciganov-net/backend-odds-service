import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PinoLogger } from 'nestjs-pino'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import { RedisService } from '@/infrastructure/redis/redis.service'

@Injectable()
export class OutcomesScheduler {
	constructor(
		private readonly logger: PinoLogger,
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService
	) {
		this.logger.setContext(OutcomesScheduler.name)
	}

	@Cron(CronExpression.EVERY_5_MINUTES)
	async changeCoefficients() {
		const now = new Date()

		const outcomes = await this.prismaService.outcome.findMany({
			where: {
				isActive: true
			},
			select: {
				id: true,
				eventId: true
			}
		})

		for (const outcome of outcomes) {
			const coefficient = await this.redisService.hget(
				`event:coefficients:${outcome.eventId}`,
				outcome.id
			)
			await this.prismaService.outcome.update({
				where: {
					id: outcome.id
				},
				data: {
					coefficient: Number(coefficient)
				}
			})
		}

		await this.prismaService.event.updateMany({
			where: {
				start: { lte: now },
				end: { gte: now }
			},
			data: {
				status: 'LIVE'
			}
		})
		this.logger.info('All bets has been set to right status')
	}
}
