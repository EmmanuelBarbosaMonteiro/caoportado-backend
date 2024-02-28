import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { DogsRepository } from '@/domain/customers/application/repositories/dog-repository'
import { PrismaDogsRepository } from './prisma/repositories/prisma-dog-repository'
import { OwnersRepository } from '@/domain/customers/application/repositories/owner-repository'
import { PrismaOwnerRepository } from './prisma/repositories/prisma-owner-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: DogsRepository,
      useClass: PrismaDogsRepository,
    },
    {
      provide: OwnersRepository,
      useClass: PrismaOwnerRepository,
    },
  ],
  exports: [PrismaService, DogsRepository, OwnersRepository],
})
export class DatabaseModule {}
