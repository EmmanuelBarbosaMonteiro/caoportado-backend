import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { DogRepository } from '@/core/domain/customers/application/repositories/dog-repository'
import { PrismaDogRepository } from './prisma/repositories/prisma-dog-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: DogRepository,
      useClass: PrismaDogRepository,
    },
  ],
  exports: [PrismaService, DogRepository],
})
export class DatabaseModule {}
