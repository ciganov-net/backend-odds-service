import {
	CreateEventRequest,
	CreateEventResponse,
	GetEventRequest,
	GetEventResponse,
	GetEventsByCategoryRequest,
	GetEventsByCategoryResponse,
	GetEventsRequest,
	GetEventsRequest_SortBy,
	GetEventsResponse,
	GetRandomEventsRequest,
	GetRandomEventsResponse,
	SwitchEventLiveStateRequest,
	SwitchEventLiveStateResponse
} from '@ciganov/contracts/dist/gen/odd'
import { EventStatus as ProtoEventStatus } from '@ciganov/contracts/dist/gen/odd'
import { convertEnum, dateToProto, protoToDate, RpcStatus } from '@ciganov/core'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { EventStatus } from '@prisma/generated/enums'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class EventsService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(data: CreateEventRequest): Promise<CreateEventResponse> {
		const { name, categoryId, end, start, status } = data
		const category = await this.prismaService.category.findUnique({
			where: {
				id: categoryId
			}
		})
		if (!category)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Category is not found'
			})
		await this.prismaService.event.create({
			data: {
				end: protoToDate(end),
				name,
				start: protoToDate(start),
				status: convertEnum(EventStatus, status),
				category: { connect: { id: categoryId } }
			}
		})
		return {
			ok: true
		}
	}

	async getById(data: GetEventRequest): Promise<GetEventResponse> {
		const { id } = data
		const event = await this.prismaService.event.findUnique({
			where: {
				id
			},
			include: {
				outcomes: true,
				category: true
			}
		})
		if (!event)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Event is not found'
			})
		return {
			event: {
				categoryId: event.categoryId,
				end: dateToProto(event.end),
				id: event.id,
				name: event.name,
				start: dateToProto(event.start),
				isLive: event.isLive,
				status: convertEnum(ProtoEventStatus, event.status),
				badgeColor: event.category.badgeColor,
				categoryTitle: event.category.name,
				outcomes: event.outcomes.map(outcome => ({
					coefficient: outcome.coefficient.toNumber(),
					id: outcome.id,
					name: outcome.name,
					isActive: outcome.isActive,
					eventId: outcome.eventId
				}))
			}
		}
	}

	async getRandomEvents(
		data: GetRandomEventsRequest
	): Promise<GetRandomEventsResponse> {
		const { randomCount } = data
		const count = await this.prismaService.event.count()

		const skip = Math.floor(Math.random() * count)

		const events = await this.prismaService.event.findMany({
			skip,
			take: randomCount,
			include: {
				outcomes: true,
				category: true
			}
		})
		return {
			events: events.map(event => ({
				categoryId: event.categoryId,
				end: dateToProto(event.end),
				id: event.id,
				name: event.name,
				start: dateToProto(event.start),
				isLive: event.isLive,
				status: convertEnum(ProtoEventStatus, event.status),
				badgeColor: event.category.badgeColor,
				categoryTitle: event.category.name,
				outcomes: event.outcomes.map(outcome => ({
					coefficient: outcome.coefficient.toNumber(),
					id: outcome.id,
					name: outcome.name,
					isActive: outcome.isActive,
					eventId: outcome.eventId
				}))
			}))
		}
	}

	async getEvents(data: GetEventsRequest): Promise<GetEventsResponse> {
		const {
			outcomeTypes,
			maxCoefficient,
			minCoefficient,
			orderBy,
			search,
			take,
			skip,
			sortOrder
		} = data
		const direction: 'asc' | 'desc' =
			String(sortOrder) === '1' || sortOrder === 1 ? 'asc' : 'desc'
		let prismaOrderBy: Record<string, any> = { createdAt: 'desc' }
		const orderKey = orderBy as unknown as string | number

		switch (orderKey) {
			case GetEventsRequest_SortBy.NEWEST:
			case 'NEWEST':
				prismaOrderBy = { createdAt: direction }
				break

			case GetEventsRequest_SortBy.CLOSING_SOON:
			case 'CLOSING_SOON':
			default:
				prismaOrderBy = { end: 'desc' }
				break
		}
		const outcomesFilter: Record<string, any> = {}

		if (minCoefficient !== undefined && minCoefficient !== null) {
			outcomesFilter.coefficient = {
				...outcomesFilter.coefficient,
				gte: minCoefficient
			}
		}
		if (maxCoefficient !== undefined && maxCoefficient !== null) {
			outcomesFilter.coefficient = {
				...outcomesFilter.coefficient,
				lte: maxCoefficient
			}
		}

		if (outcomeTypes && outcomeTypes.length > 0) {
			outcomesFilter.type = { in: outcomeTypes }
		}
		const events = await this.prismaService.event.findMany({
			where: {
				...(search
					? {
							name: {
								contains: search,
								mode: 'insensitive'
							}
						}
					: {}),
				status: {
					notIn: ['CANCELLED', 'FINISHED', 'RESOLVED']
				},
				...(Object.keys(outcomesFilter).length > 0
					? {
							outcomes: {
								some: outcomesFilter
							}
						}
					: {})
			},
			orderBy: prismaOrderBy,
			include: {
				outcomes: true,
				category: true
			}
		})
		return {
			events: events.map(value => ({
				name: value.name,
				id: value.id,
				isLive: value.isLive,
				categoryId: value.categoryId,
				outcomes: value.outcomes.map(outcome => ({
					coefficient: outcome.coefficient.toNumber(),
					id: outcome.id,
					name: outcome.name,
					isActive: outcome.isActive,
					eventId: outcome.eventId
				})),
				status: convertEnum(ProtoEventStatus, value.status),
				end: dateToProto(value.end),
				start: dateToProto(value.start),
				badgeColor: value.category.badgeColor,
				categoryTitle: value.category.name
			}))
		}
	}

	async getEventsByCategory(
		data: GetEventsByCategoryRequest
	): Promise<GetEventsByCategoryResponse> {
		const { categoryId } = data

		const events = await this.prismaService.event.findMany({
			where: {
				categoryId
			},
			include: {
				outcomes: true,
				category: true
			}
		})
		return {
			events: events.map(event => ({
				categoryId: event.categoryId,
				end: dateToProto(event.end),
				id: event.id,
				name: event.name,
				start: dateToProto(event.start),
				isLive: event.isLive,
				status: convertEnum(ProtoEventStatus, event.status),
				badgeColor: event.category.badgeColor,
				categoryTitle: event.category.name,
				outcomes: event.outcomes.map(outcome => ({
					coefficient: outcome.coefficient.toNumber(),
					id: outcome.id,
					name: outcome.name,
					isActive: outcome.isActive,
					eventId: outcome.eventId
				}))
			}))
		}
	}

	async switchLiveState(
		data: SwitchEventLiveStateRequest
	): Promise<SwitchEventLiveStateResponse> {
		const { id } = data
		const event = await this.prismaService.event.findUnique({
			where: {
				id
			}
		})
		if (!event)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Event is not found'
			})
		await this.prismaService.event.update({
			where: {
				id
			},
			data: {
				isLive: !event.isLive
			}
		})
		return {
			ok: true
		}
	}
}
