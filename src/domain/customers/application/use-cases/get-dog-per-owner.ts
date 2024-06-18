import { Either, right, left } from '@/core/either'
import { Dog } from '../../enterprise/entities/dog'
import { Injectable } from '@nestjs/common'
import { DogsRepository } from '../repositories/dog-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface GetDogByIdPerOwnerUseCaseRequest {
  dogId: string
  ownerId: string
}

type GetDogByIdPerOwnerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    dog: Dog
  }
>

@Injectable()
export class GetDogByIdPerOwnerUseCase {
  constructor(private dogsRepository: DogsRepository) {}

  async execute({
    dogId,
    ownerId,
  }: GetDogByIdPerOwnerUseCaseRequest): Promise<GetDogByIdPerOwnerUseCaseResponse> {
    const dog = await this.dogsRepository.findById(dogId)

    if (!dog) {
      return left(new ResourceNotFoundError())
    }

    if (ownerId !== dog.ownerId.toString()) {
      return left(new NotAllowedError())
    }

    return right({
      dog,
    })
  }
}
