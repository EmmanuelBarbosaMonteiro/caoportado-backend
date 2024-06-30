import { Either, right } from '@/core/either'
import { Dog } from '../../enterprise/entities/dog'
import { Injectable } from '@nestjs/common'
import { DogsRepository } from '../repositories/dog-repository'

interface FetchDogsPerOwnerUseCaseRequest {
  ownerId: string
  page: number
}

type FetchDogsPerOwnerUseCaseResponse = Either<
  null,
  {
    dogs: Dog[]
  }
>

@Injectable()
export class FetchDogsPerOwnerUseCase {
  constructor(private dogsRepository: DogsRepository) {}

  async execute({
    ownerId,
    page,
  }: FetchDogsPerOwnerUseCaseRequest): Promise<FetchDogsPerOwnerUseCaseResponse> {
    const dogs = await this.dogsRepository.findMany(ownerId, { page })

    return right({
      dogs,
    })
  }
}
