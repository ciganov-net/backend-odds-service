import {
	ChangeCoefficientRequest,
	ChangeCoefficientResponse,
	CreateOutcomeRequest,
	CreateOutcomeResponse,
	GetOutcomeByEventRequest,
	GetOutcomeByEventResponse,
	ValidateOutcomeRequest,
	ValidateOutcomeResponse
} from '@ciganov/contracts/dist/gen/odd'
import { RpcStatus } from '@ciganov/core'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import { RedisService } from '@/infrastructure/redis/redis.service'

@Injectable()
export class OutcomesService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService
	) {}

	async createOutcome(
		data: CreateOutcomeRequest
	): Promise<CreateOutcomeResponse> {
		const { coefficient, eventId, name } = data

		const event = await this.prismaService.event.findUnique({
			where: {
				id: eventId
			}
		})

		if (!event) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Event is not found'
			})
		}

		const newOutcome = await this.prismaService.outcome.create({
			data: {
				coefficient,
				name,
				event: { connect: { id: eventId } }
			}
		})

		await this.redisService.hset(`event:amounts:${eventId}`, newOutcome.id, 0)
		await this.redisService.hset(`event:coefficients:${eventId}`, newOutcome.id, coefficient)

		return {
			ok: true
		}
	}

	async getOutcomesByEventId(
		data: GetOutcomeByEventRequest
	): Promise<GetOutcomeByEventResponse> {
		const { eventId } = data

		const event = await this.prismaService.event.findUnique({
			where: {
				id: eventId
			},
			include: {
				outcomes: true
			}
		})

		if (!event) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Event is not found'
			})
		}

		return {
			outcomes: event.outcomes.map(outcome => ({
				coefficient: outcome.coefficient.toNumber(),
				id: outcome.id,
				name: outcome.name,
				eventId: outcome.eventId,
				isActive: outcome.isActive
			}))
		}
	}

	async changeCoefficient(
		data: ChangeCoefficientRequest
	): Promise<ChangeCoefficientResponse> {
		const { coefficient, outcomeId } = data

		const outcome = await this.prismaService.outcome.findUnique({
			where: {
				id: outcomeId
			}
		})

		if (!outcome) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Outcome is not found'
			})
		}

		await this.prismaService.outcome.update({
			where: {
				id: outcomeId
			},
			data: {
				coefficient
			}
		})

		return {
			ok: true
		}
	}

	async validate(
		data: ValidateOutcomeRequest
	): Promise<ValidateOutcomeResponse> {
		const { outcomeId } = data
		const outcome = await this.prismaService.outcome.findUnique({
			where: {
				id: outcomeId
			},
			include: {
				event: true
			}
		})

		if (!outcome)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Outcome is not found'
			})

		return {
			coefficient: outcome.coefficient.toNumber(),
			eventId: outcome.eventId,
			eventName: outcome.event.name,
			isValid: outcome.isActive,
			outcomeName: outcome.name
		}
	}
}
