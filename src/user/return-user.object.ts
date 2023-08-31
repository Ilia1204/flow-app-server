import { Prisma } from '@prisma/client'

export const returnUserObject: Prisma.UserSelect = {
	id: true,
	createdAt: true,
	email: true,
	password: false
}
