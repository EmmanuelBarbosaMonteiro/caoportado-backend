import { OwnersRepository } from '@/domain/customers/application/repositories/owner-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaOwnerMapper } from '../mappers/prisma-owner-mapper'
import { Owner } from '@/domain/customers/enterprise/entities/owner'

@Injectable()
export class PrismaOwnerRepository implements OwnersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Owner | null> {
    const owner = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    })

    if (!owner) {
      return null
    }

    return PrismaOwnerMapper.toDomain(owner)
  }

  async create(owner: Owner): Promise<void> {
    const data = PrismaOwnerMapper.toPrisma(owner)

    await this.prisma.customer.create({
      data,
    })
  }
}
