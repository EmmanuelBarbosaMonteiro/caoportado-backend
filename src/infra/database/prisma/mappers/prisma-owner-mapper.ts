import { Customer as PrismaUser, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Owner } from '@/domain/customers/enterprise/entities/owner'

export class PrismaOwnerMapper {
  static toDomain(raw: PrismaUser): Owner {
    return Owner.create(
      {
        firstName: raw.fristName,
        lastName: raw.lastName,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(owner: Owner): Prisma.CustomerUncheckedCreateInput {
    return {
      id: owner.id.toString(),
      fristName: owner.firstName,
      lastName: owner.lastName,
      email: owner.email,
      password: owner.password,
    }
  }
}
