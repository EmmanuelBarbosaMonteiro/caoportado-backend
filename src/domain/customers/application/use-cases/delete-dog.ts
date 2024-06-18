import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { DogsRepository } from '../repositories/dog-repository'

interface DeleteDogUseCaseRequest {
  ownerId: string
  dogId: string
}

type DeleteDogUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteDogUseCase {
  constructor(private dogsRepository: DogsRepository) {}

  async execute({
    dogId,
    ownerId,
  }: DeleteDogUseCaseRequest): Promise<DeleteDogUseCaseResponse> {
    const dog = await this.dogsRepository.findById(dogId)

    if (!dog) {
      return left(new ResourceNotFoundError())
    }

    if (ownerId !== dog.ownerId.toString()) {
      return left(new NotAllowedError())
    }

    await this.dogsRepository.delete(dogId)

    return right(null)
  }
}
