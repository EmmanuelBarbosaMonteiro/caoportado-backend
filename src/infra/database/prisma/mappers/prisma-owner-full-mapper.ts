import {
  User as PrismaUser,
  Prisma,
  Dog as PrismaDog,
  Accommodation as PrismaAccommodation,
} from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Owner, Role } from '@/domain/customers/enterprise/entities/owner'
import { StatusAccommodation } from '@/domain/customers/enterprise/entities/Accommodation'

export class PrismaOwnerFullMapper {
  static toDomain(
    raw: PrismaUser & {
      dogs: PrismaDog[]
      Accommodation: PrismaAccommodation[]
    },
  ): Owner {
    return Owner.create(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        email: raw.email,
        password: raw.password,
        role: raw.role as Role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        dogs: raw.dogs?.map((dog) => ({
          id: new UniqueEntityID(dog.id),
          name: dog.name,
          gender: dog.gender,
          size: dog.size,
          breed: dog.breed,
          birthdate: dog.birthdate,
          isNeutered: dog.isNeutered,
          isTreatedAgainstTicks: dog.isTreatedAgainstTicks,
          isTreatedAgainstWorms: dog.isTreatedAgainstWorms,
          vaccinesCard: dog.vaccinesCard,
          ownerId: new UniqueEntityID(dog.userId),
          createdAt: dog.createdAt,
          updatedAt: dog.updatedAt,
        })),
        accommodations: raw.Accommodation?.map((accommodation) => ({
          id: new UniqueEntityID(accommodation.id),
          status: accommodation.status as StatusAccommodation,
          checkInDate: accommodation.checkInDate,
          checkOutDate: accommodation.checkOutDate,
          isPaid: accommodation.isPaid,
          ownerId: new UniqueEntityID(accommodation.userId),
          dogId: new UniqueEntityID(accommodation.dogId),
          createdAt: accommodation.createdAt,
          updatedAt: accommodation.updatedAt,
        })),
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
      createdAt: owner.createdAt,
      updatedAt: owner.updatedAt,
    }
  }
}
