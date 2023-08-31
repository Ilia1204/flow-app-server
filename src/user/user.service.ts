import { BadRequestException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { returnUserObject } from './return-user.object'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const user = this.prisma.user.findUnique({
			where: { id },
			select: {
				...returnUserObject
			}
		})

		if (!user) throw new Error('Пользователь не найден')

		return user
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
}
