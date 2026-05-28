import type {
	ChangeCoefficientRequest,
	ChangeCoefficientResponse,
	CreateOutcomeRequest,
	CreateOutcomeResponse,
	GetOutcomeByEventRequest,
	GetOutcomeByEventResponse,
	ValidateOutcomeRequest,
	ValidateOutcomeResponse
} from '@ciganov/contracts/dist/gen/odd'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { OutcomesService } from './outcomes.service'

@Controller()
export class OutcomesController {
	constructor(private readonly outcomesService: OutcomesService) {}

	@GrpcMethod('OddService', 'CreateOutcome')
	async createOutcome(
		data: CreateOutcomeRequest
	): Promise<CreateOutcomeResponse> {
		return this.outcomesService.createOutcome(data)
	}

	@GrpcMethod('OddService', 'GetOutcomeByEvent')
	async getOutcomesByEventId(
		data: GetOutcomeByEventRequest
	): Promise<GetOutcomeByEventResponse> {
		return this.outcomesService.getOutcomesByEventId(data)
	}

	@GrpcMethod('OddService', 'ChangeCoefficient')
	async changeCoefficient(
		data: ChangeCoefficientRequest
	): Promise<ChangeCoefficientResponse> {
		return this.outcomesService.changeCoefficient(data)
	}

	@GrpcMethod('OddService', 'ValidateOutcome')
	async validateOutcome(
		data: ValidateOutcomeRequest
	): Promise<ValidateOutcomeResponse> {
		return this.outcomesService.validate(data)
	}
}
