import {
  Accommodation as PrismaAccommodation,
  Prisma,
  Dog as PrismaDog,
  User as PrismaUser,
} from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Accommodation,
  AccommodationProps,
  StatusAccommodation,
} from '@/domain/customers/enterprise/entities/Accommodation'
import { Role } from '@/domain/customers/enterprise/entities/owner'

export class PrismaAccommodationFullMapper {
  static toDomain(
    raw: PrismaAccommodation & {
      dog: PrismaDog
      user: PrismaUser
    },
  ): Accommodation {
    return Accommodation.create(
      {
        ownerId: new UniqueEntityID(raw.userId),
        dogId: new UniqueEntityID(raw.dogId),
        status: raw.status as StatusAccommodation,
        checkInDate: raw.checkInDate,
        checkOutDate: raw.checkOutDate,
        isPaid: raw.isPaid,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        dog: {
          name: raw.dog.name,
          gender: raw.dog.gender,
          size: raw.dog.size,
          breed: raw.dog.breed,
          birthdate: raw.dog.birthdate,
          isNeutered: raw.dog.isNeutered,
          isTreatedAgainstTicks: raw.dog.isTreatedAgainstTicks,
          isTreatedAgainstWorms: raw.dog.isTreatedAgainstWorms,
          vaccinesCard: raw.dog.vaccinesCard,
          ownerId: new UniqueEntityID(raw.dog.userId),
          createdAt: raw.dog.createdAt,
          updatedAt: raw.dog.updatedAt,
        },
        owner: {
          firstName: raw.user.firstName,
          lastName: raw.user.lastName,
          email: raw.user.email,
          password: raw.user.password,
          role: raw.user.role as Role,
          createdAt: raw.user.createdAt,
          updatedAt: raw.user.updatedAt,
        },
      } as AccommodationProps,
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    accommodation: Accommodation,
  ): Prisma.AccommodationUncheckedCreateInput {
    return {
      id: accommodation.id.toString(),
      status: accommodation.status,
      checkInDate: accommodation.checkInDate,
      checkOutDate: accommodation.checkOutDate,
      isPaid: accommodation.isPaid,
      createdAt: accommodation.createdAt,
      updatedAt: accommodation.updatedAt,
      userId: accommodation.ownerId.toString(),
      dogId: accommodation.dogId.toString(),
    }
  }
}
