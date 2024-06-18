import { Dog } from '@/domain/customers/enterprise/entities/dog'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Dog as PrismaDog, Prisma } from '@prisma/client'

export class PrismaDogMapper {
  static toDomain(raw: PrismaDog): Dog {
    return Dog.create(
      {
        ownerId: new UniqueEntityID(raw.userId),
        name: raw.name,
        gender: raw.gender,
        size: raw.size,
        breed: raw.breed,
        birthdate: raw.birthdate,
        isNeutered: raw.isNeutered,
        isTreatedAgainstTicks: raw.isTreatedAgainstTicks,
        isTreatedAgainstWorms: raw.isTreatedAgainstWorms,
        vaccinesCard: raw.vaccinesCard,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(dog: Dog): Prisma.DogUncheckedCreateInput {
    return {
      id: dog.id.toString(),
      userId: dog.ownerId.toString(),
      name: dog.name,
      gender: dog.gender,
      size: dog.size,
      breed: dog.breed,
      birthdate: dog.birthdate,
      isNeutered: dog.isNeutered,
      isTreatedAgainstTicks: dog.isTreatedAgainstTicks,
      isTreatedAgainstWorms: dog.isTreatedAgainstWorms,
      vaccinesCard: dog.vaccinesCard,
      createdAt: dog.createdAt,
      updatedAt: dog.updatedAt,
    }
  }
}
