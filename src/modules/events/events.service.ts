import {
	CreateEventRequest,
	CreateEventResponse,
	GetEventRequest,
	GetEventResponse,
	GetEventsByCategoryRequest,
	GetEventsByCategoryResponse,
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

	async getEvents(): Promise<GetEventsResponse> {
		const events = await this.prismaService.event.findMany({
			orderBy: {
				updatedAt: 'desc'
			},
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
