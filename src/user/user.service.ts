import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { returnUserObject } from './return-user.object'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getAllUsers(searchTerm?: string) {
		const where: Prisma.UserWhereInput = {}

		if (searchTerm)
			where.email = {
				contains: searchTerm,
				mode: 'insensitive'
			}

		return this.prisma.user.findMany({ where })
	}

	async byId(id: number) {
		const user = this.prisma.user.findUnique({
			where: { id },
			select: {
				...returnUserObject
			}
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	async getCount() {
		return this.prisma.user.count()
	}

	async updateProfile(id: number, dto: UpdateUserDto) {
		const isSameUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Данный email уже занят')

		const user = await this.byId(id)

		if (!user) throw new NotFoundException('Пользователь не найден')

		return this.prisma.user.update({
			where: {
				id
			},
			data: {
				email: dto.email,
				password: dto.password ? await hash(dto.password) : user.password
			}
		})
	}

	async delete(id: number) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				options: true,
				LogActiveDay: true
			}
		})

		await this.prisma.flowOptions.deleteMany({
			where: {
				userId: id
			}
		})

		await this.prisma.logActiveDay.deleteMany({
			where: {
				userId: id
			}
		})

		if (!user) throw new NotFoundException('User not found')
		else
			await this.prisma.user.delete({
				where: {
					id
				}
			})

		return { message: 'User was deleted successfully!' }
	}
}
