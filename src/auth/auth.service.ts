import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './auth.dto'
import { RefreshTokenDto } from './refreshToken.dto'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		const tokens = await this.issueTokenPair(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})

		if (oldUser) throw new BadRequestException('Email занят')

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				password: await hash(dto.password),
				options: {
					create: {
						sessionCount: 7,
						breakDuration: 300,
						flowDuration: 900
					}
				}
			}
		})

		const tokens = await this.issueTokenPair(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken)
			throw new UnauthorizedException('Please, sign in to account')

		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid token or expired')

		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id
			}
		})

		const tokens = await this.issueTokenPair(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async validateUser(dto: AuthDto): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (!user) throw new NotFoundException('User not found')

		const isValidPassword = await verify(user.password, dto.password)

		if (!isValidPassword) throw new UnauthorizedException('Invalid Password')

		return user
	}

	async issueTokenPair(userId: number) {
		const data = { id: userId }

		const refreshToken = await this.jwt.signAsync(data, {
			expiresIn: '15d'
		})

		const accessToken = await this.jwt.signAsync(data, {
			expiresIn: '91d'
		})

		return { accessToken, refreshToken }
	}

	returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			isAdmin: user.isAdmin
		}
	}
}
