import { DogsRepository } from '@/domain/customers/application/repositories/dog-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaDogMapper } from '../mappers/prisma-dog-mapper'
import { Dog } from '@/domain/customers/enterprise/entities/dog'
import { PaginationParams } from '@/core/repositories/pagination-params'

@Injectable()
export class PrismaDogsRepository implements DogsRepository {
  constructor(private prisma: PrismaService) {}

  async create(dog: Dog): Promise<void> {
    const data = PrismaDogMapper.toPrisma(dog)

    await this.prisma.dog.create({
      data,
    })
  }

  async findMany(id: string, { page }: PaginationParams): Promise<Dog[]> {
    const dog = await this.prisma.dog.findMany({
      where: {
        ownerId: id,
      },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return dog.map(PrismaDogMapper.toDomain)
  }
}
