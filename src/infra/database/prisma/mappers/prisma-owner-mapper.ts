import { Customer as PrismaUser, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Owner } from '@/domain/customers/enterprise/entities/owner'

export class PrismaOwnerMapper {
  static toDomain(raw: PrismaUser): Owner {
    return Owner.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(owner: Owner): Prisma.CustomerUncheckedCreateInput {
    return {
      id: owner.id.toString(),
      name: owner.name,
      email: owner.email,
      password: owner.password,
    }
  }
}
