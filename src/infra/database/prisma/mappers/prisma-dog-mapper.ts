import { Dog } from '@/domain/customers/enterprise/entities/dog'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Dog as PrismaDog, Prisma } from '@prisma/client'

export class PrismaDogMapper {
  static toDomain(raw: PrismaDog): Dog {
    return Dog.create(
      {
        ownerId: new UniqueEntityID(raw.ownerId),
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(dog: Dog): Prisma.DogUncheckedCreateInput {
    return {
      id: dog.id.toString(),
      ownerId: dog.ownerId.toString(),
      name: dog.name,
      createdAt: dog.createdAt,
      updatedAt: dog.updatedAt,
    }
  }
}
