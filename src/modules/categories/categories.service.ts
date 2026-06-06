import {
	CreateCategoryRequest,
	CreateCategoryResponse,
	GetCategoriesResponse,
	GetCategoryRequest,
	GetCategoryResponse
} from '@ciganov/contracts/dist/gen/odd'
import { RpcStatus } from '@ciganov/core'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class CategoriesService {
	constructor(private readonly prismaService: PrismaService) {}

	async getById(data: GetCategoryRequest): Promise<GetCategoryResponse> {
		const { id } = data
		const category = await this.prismaService.category.findUnique({
			where: {
				id
			}
		})
		if (!category) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Category is not found'
			})
		}
		return {
			category: {
				id: category.id,
				name: category.name,
				slug: category.slug,
				isActive: category.isActive,
				description: category.description
			}
		}
	}

	async create(data: CreateCategoryRequest): Promise<CreateCategoryResponse> {
		const { name, slug, description } = data
		await this.prismaService.category.create({
			data: {
				name,
				slug,
				description
			}
		})
		return {
			ok: true
		}
	}

	async getAll(): Promise<GetCategoriesResponse> {
		const categories = await this.prismaService.category.findMany()
		return {
			categories: categories.map(category => ({
				id: category.id,
				name: category.name,
				slug: category.slug,
				isActive: category.isActive,
				description: category.description
			}))
		}
	}
}
