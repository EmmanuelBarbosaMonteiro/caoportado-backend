import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { DogsRepository } from '@/domain/customers/application/repositories/dog-repository'
import { PrismaDogsRepository } from './prisma/repositories/prisma-dog-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: DogsRepository,
      useClass: PrismaDogsRepository,
    },
  ],
  exports: [PrismaService, DogsRepository],
})
export class DatabaseModule {}
