import { Either, left, right } from '@/core/either'
import { Dog } from '../../enterprise/entities/dog'
import { DogsRepository } from '../repositories/dog-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { OwnersRepository } from '../repositories/owner-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface CreateDogUseCaseRequest {
  ownerId: string
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

type CreateDogUseCaseResponse = Either<ResourceNotFoundError, { dog: Dog }>

@Injectable()
export class CreateDogUseCase {
  constructor(
    private DogsRepository: DogsRepository,
    private ownersRepository: OwnersRepository,
  ) {}

  async execute({
    ownerId,
    name,
    gender,
    size,
    breed,
    birthdate,
    isNeutered,
    isTreatedAgainstTicks,
    isTreatedAgainstWorms,
    vaccinesCard,
  }: CreateDogUseCaseRequest): Promise<CreateDogUseCaseResponse> {
    const owner = await this.ownersRepository.findById(ownerId)

    if (!owner) {
      return left(new ResourceNotFoundError())
    }

    const dog = Dog.create({
      ownerId: new UniqueEntityID(ownerId),
      name,
      gender,
      size,
      breed,
      birthdate,
      isNeutered,
      isTreatedAgainstTicks,
      isTreatedAgainstWorms,
      vaccinesCard,
    })

    await this.DogsRepository.create(dog)

    return right({
      dog,
    })
  }
}
