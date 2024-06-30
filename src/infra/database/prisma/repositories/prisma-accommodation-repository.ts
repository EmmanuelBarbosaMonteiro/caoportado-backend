import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  Accommodation,
  StatusAccommodation,
} from '@/domain/customers/enterprise/entities/Accommodation'
import { PrismaAccommodationMapper } from '../mappers/prisma-accommodation-mapper'
import { AccommodationsRepository } from '@/domain/customers/application/repositories/accommodation-repository'
import { Prisma } from '@prisma/client'
import { PrismaAccommodationFullMapper } from '../mappers/prisma-accommodation-full-mapper'

@Injectable()
export class PrismaAccommodationRepository implements AccommodationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(accommodation: Accommodation): Promise<void> {
    const data = PrismaAccommodationMapper.toPrisma(accommodation)

    await this.prisma.accommodation.create({
      data,
    })
  }

  async findById(accommodationId: string): Promise<Accommodation | null> {
    const accommodation = await this.prisma.accommodation.findUnique({
      where: {
        id: accommodationId,
      },
      include: {
        user: true,
        dog: true,
      },
    })

    return accommodation
      ? PrismaAccommodationMapper.toDomain(accommodation)
      : null
  }

  async findAllByOwner(ownerId: string): Promise<Accommodation[]> {
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

  async findAll(
    pageIndex: number,
    dogName: string,
    accommodationStatus: StatusAccommodation,
  ): Promise<{
    accommodations: Accommodation[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number
    }
  }> {
    const perPage = 5
    const skip = (pageIndex - 1) * perPage

    const filters: Prisma.AccommodationWhereInput[] = []

    if (dogName) {
      filters.push({
        dog: {
          name: {
            contains: dogName,
            mode: 'insensitive',
          },
        },
      })
    }

    if (accommodationStatus) {
      filters.push({
        status: accommodationStatus,
      })
    }

    const where: Prisma.AccommodationWhereInput = {
      AND: filters.length > 0 ? filters : undefined,
    }

    const [totalCount, accommodations] = await Promise.all([
      this.prisma.accommodation.count({ where }),
      this.prisma.accommodation.findMany({
        where,
        skip,
        take: perPage,
        include: {
          dog: true,
          user: true,
        },
      }),
    ])

    const accommodationDomains = accommodations.map(
      PrismaAccommodationFullMapper.toDomain,
    )

    return {
      accommodations: accommodationDomains,
      meta: {
        pageIndex,
        perPage,
        totalCount,
      },
    }
  }
}
