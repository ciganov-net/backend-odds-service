import type {
	CreateCategoryRequest,
	CreateCategoryResponse,
	GetCategoriesResponse,
	GetCategoryRequest,
	GetCategoryResponse
} from '@ciganov/contracts/dist/gen/odd'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { CategoriesService } from './categories.service'

@Controller()
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@GrpcMethod('OddService', 'CreateCategory')
	async createCategory(
		data: CreateCategoryRequest
	): Promise<CreateCategoryResponse> {
		return this.categoriesService.create(data)
	}

	@GrpcMethod('OddService', 'GetCategory')
	async getCategory(data: GetCategoryRequest): Promise<GetCategoryResponse> {
		return this.categoriesService.getById(data)
	}

	@GrpcMethod('OddService', 'GetCategories')
	async getCategories(): Promise<GetCategoriesResponse> {
		return this.categoriesService.getAll()
	}
}
