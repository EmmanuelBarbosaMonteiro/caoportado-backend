import { OwnersRepository } from '@/domain/customers/application/repositories/owner-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaOwnerMapper } from '../mappers/prisma-owner-mapper'
import { Owner } from '@/domain/customers/enterprise/entities/owner'
import { PrismaOwnerFullMapper } from '../mappers/prisma-owner-full-mapper'

@Injectable()
export class PrismaOwnerRepository implements OwnersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Owner | null> {
    const owner = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!owner) {
      return null
    }

    return PrismaOwnerMapper.toDomain(owner)
  }

  async findById(id: string): Promise<Owner | null> {
    const owner = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!owner) {
      return null
    }

    return PrismaOwnerMapper.toDomain(owner)
  }

  async create(owner: Owner): Promise<void> {
    const data = PrismaOwnerMapper.toPrisma(owner)

    await this.prisma.user.create({
      data,
    })
  }

  async findAll(
    customerName: string,
    pageIndex: number,
  ): Promise<{
    owners: Owner[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number
    }
  }> {
    const perPage = 5
    const skip = (pageIndex - 1) * perPage

    const [totalCount, owners] = await Promise.all([
      this.prisma.user.count({
        where: {
          firstName: {
            contains: customerName,
            mode: 'insensitive',
          },
          role: 'CUSTOMER',
        },
      }),
      this.prisma.user.findMany({
        where: {
          firstName: {
            contains: customerName,
            mode: 'insensitive',
          },
          role: 'CUSTOMER',
        },
        skip,
        take: perPage,
        include: {
          dogs: true,
          Accommodation: true,
        },
      }),
    ])

    const ownerDomains = owners.map(PrismaOwnerFullMapper.toDomain)

    return {
      owners: ownerDomains,
      meta: {
        pageIndex,
        perPage,
        totalCount,
      },
    }
  }
}
