import { DogRepository } from '@/core/domain/customers/application/repositories/dog-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaDogMapper } from '../mappers/prisma-dog-mapper'
import { Dog } from '@/core/domain/customers/enterprise/entities/dog'

@Injectable()
export class PrismaDogRepository implements DogRepository {
  constructor(private prisma: PrismaService) {}

  async create(dog: Dog): Promise<void> {
    const data = PrismaDogMapper.toPrisma(dog)

    await this.prisma.dog.create({
      data,
    })
  }
}
