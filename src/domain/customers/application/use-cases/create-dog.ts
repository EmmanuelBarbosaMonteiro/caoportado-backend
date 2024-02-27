import { Either, right } from '@/core/either'
import { Dog } from '../../enterprise/entities/dog'
import { DogsRepository } from '../repositories/dog-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'

interface CreateDogUseCaseRequest {
  ownerId: string
  name: string
}

type CreateDogUseCaseResponse = Either<null, { dog: Dog }>

@Injectable()
export class CreateDogUseCase {
  constructor(private DogsRepository: DogsRepository) {}

  async execute({
    ownerId,
    name,
  }: CreateDogUseCaseRequest): Promise<CreateDogUseCaseResponse> {
    const dog = Dog.create({
      ownerId: new UniqueEntityID(ownerId),
      name,
    })

    await this.DogsRepository.create(dog)

    return right({
      dog,
    })
  }
}
