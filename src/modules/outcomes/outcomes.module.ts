import { Module } from '@nestjs/common'

import { OutcomesController } from './outcomes.controller'
import { OutcomesScheduler } from './outcomes.schedule'
import { OutcomesService } from './outcomes.service'

@Module({
	controllers: [OutcomesController],
	providers: [OutcomesService, OutcomesScheduler]
})
export class OutcomesModule {}
