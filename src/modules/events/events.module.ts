import { Module } from '@nestjs/common'

import { EventsController } from './events.controller'
import { EventsScheduler } from './events.schedule'
import { EventsService } from './events.service'

@Module({
	controllers: [EventsController],
	providers: [EventsService, EventsScheduler]
})
export class EventsModule {}
