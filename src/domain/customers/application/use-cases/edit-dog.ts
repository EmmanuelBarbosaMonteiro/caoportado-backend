import { Either, left, right } from '@/core/either'
import { Dog } from '../../enterprise/entities/dog'
import { DogsRepository } from '../repositories/dog-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface EditDogUseCaseRequest {
  ownerId: string
  dogId: string
  name: string
  gender: string
  size: string
  breed: string
  birthdate: Date
  isNeutered: boolean
  isTreatedAgainstTicks: Date
  isTreatedAgainstWorms: Date
  vaccinesCard: string
}

type EditDogUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    dog: Dog
  }
>

@Injectable()
export class EditDogUseCase {
  constructor(private dogsRepository: DogsRepository) {}

  async execute({
    ownerId,
    dogId,
    name,
    gender,
    size,
    breed,
    birthdate,
    isNeutered,
    isTreatedAgainstTicks,
    isTreatedAgainstWorms,
    vaccinesCard,
  }: EditDogUseCaseRequest): Promise<EditDogUseCaseResponse> {
    const dog = await this.dogsRepository.findById(dogId)

    if (!dog) {
      return left(new ResourceNotFoundError())
    }

    if (ownerId !== dog.ownerId.toString()) {
      return left(new NotAllowedError())
    }

    dog.name = name
    dog.gender = gender
    dog.size = size
    dog.breed = breed
    dog.birthdate = birthdate
    dog.isNeutered = isNeutered
    dog.isTreatedAgainstTicks = isTreatedAgainstTicks
    dog.isTreatedAgainstWorms = isTreatedAgainstWorms
    dog.vaccinesCard = vaccinesCard

    if (dog.isModified()) {
      await this.dogsRepository.save(dog)
    }

    return right({ dog })
  }
}
