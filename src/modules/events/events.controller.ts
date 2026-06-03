import type {
	CreateEventRequest,
	CreateEventResponse,
	GetEventRequest,
	GetEventResponse,
	GetEventsByCategoryRequest,
	GetEventsByCategoryResponse,
	GetRandomEventsRequest,
	GetRandomEventsResponse,
	SwitchEventLiveStateRequest,
	SwitchEventLiveStateResponse
} from '@ciganov/contracts/dist/gen/odd'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { EventsService } from './events.service'

@Controller()
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

	@GrpcMethod('OddService', 'CreateEvent')
	async createEvent(data: CreateEventRequest): Promise<CreateEventResponse> {
		return this.eventsService.create(data)
	}

	@GrpcMethod('OddService', 'GetEvent')
	async getEvent(data: GetEventRequest): Promise<GetEventResponse> {
		return this.eventsService.getById(data)
	}

	@GrpcMethod('OddService', 'GetEventsByCategory')
	async getEventsByCategory(
		data: GetEventsByCategoryRequest
	): Promise<GetEventsByCategoryResponse> {
		return this.eventsService.getEventsByCategory(data)
	}

	@GrpcMethod('OddService', 'GetRandomEvents')
	async getRandomEvents(
		data: GetRandomEventsRequest
	): Promise<GetRandomEventsResponse> {
		return this.eventsService.getRandomEvents(data)
	}

	@GrpcMethod('OddService', 'SwitchEventLiveState')
	async switchLiveState(
		data: SwitchEventLiveStateRequest
	): Promise<SwitchEventLiveStateResponse> {
		return this.eventsService.switchLiveState(data)
	}
}
