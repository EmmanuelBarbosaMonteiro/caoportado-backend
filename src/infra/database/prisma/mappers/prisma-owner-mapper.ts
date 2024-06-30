import { User as PrismaUser, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Owner, Role } from '@/domain/customers/enterprise/entities/owner'

export class PrismaOwnerMapper {
  static toDomain(raw: PrismaUser): Owner {
    return Owner.create(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        email: raw.email,
        password: raw.password,
        role: raw.role as Role,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(owner: Owner): Prisma.UserUncheckedCreateInput {
    return {
      id: owner.id.toString(),
      firstName: owner.firstName,
      lastName: owner.lastName,
      email: owner.email,
      password: owner.password,
      role: owner.role,
    }
  }
}
