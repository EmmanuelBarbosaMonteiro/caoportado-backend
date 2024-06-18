import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Accommodation } from '@/domain/customers/enterprise/entities/Accommodation'
import { PrismaAccommodationMapper } from '../mappers/prisma-accommodation-mapper'
import { AccommodationsRepository } from '@/domain/customers/application/repositories/accommodation-repository'

@Injectable()
export class PrismaAccommodationRepository implements AccommodationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(accommodation: Accommodation): Promise<void> {
    const data = PrismaAccommodationMapper.toPrisma(accommodation)

    await this.prisma.accommodation.create({
      data,
    })
  }

  async findById(id: string): Promise<Accommodation | null> {
    const accommodation = await this.prisma.accommodation.findUnique({
      where: {
        id,
      },
    })

    return accommodation
      ? PrismaAccommodationMapper.toDomain(accommodation)
      : null
  }

  async findAll(ownerId: string): Promise<Accommodation[]> {
    const accommodations = await this.prisma.accommodation.findMany({
      where: {
        userId: ownerId,
      },
    })

    const mappedAccommodationsPromises = accommodations.map(
      async (accommodation) => {
        return PrismaAccommodationMapper.toDomain(accommodation)
      },
    )

    return Promise.all(mappedAccommodationsPromises)
  }

  async update(Accommodation: Accommodation): Promise<void> {
    const data = PrismaAccommodationMapper.toPrisma(Accommodation)

    await this.prisma.accommodation.update({
      where: {
        id: Accommodation.id.toString(),
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.accommodation.delete({
      where: {
        id,
      },
    })
  }
}
