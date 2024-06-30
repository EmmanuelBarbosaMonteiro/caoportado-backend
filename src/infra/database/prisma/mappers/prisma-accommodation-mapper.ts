import {
  Accommodation,
  StatusAccommodation,
} from '@/domain/customers/enterprise/entities/accommodation'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Accommodation as PrismaAccommodation, Prisma } from '@prisma/client'

export class PrismaAccommodationMapper {
  static toDomain(raw: PrismaAccommodation): Accommodation {
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
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    accommodation: Accommodation,
  ): Prisma.AccommodationUncheckedCreateInput {
    return {
      id: accommodation.id.toString(),
      userId: accommodation.ownerId.toString(),
      dogId: accommodation.dogId.toString(),
      status: accommodation.status,
      checkInDate: accommodation.checkInDate,
      checkOutDate: accommodation.checkOutDate,
      isPaid: accommodation.isPaid ?? null,
      createdAt: accommodation.createdAt,
      updatedAt: accommodation.updatedAt,
    }
  }
}
