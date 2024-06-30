import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Accommodation } from '../../enterprise/entities/Accommodation'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AccommodationsRepository } from '../repositories/accommodation-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { OwnersRepository } from '../repositories/owner-repository'
import { DogsRepository } from '../repositories/dog-repository'

interface CreateAccommodationUseCaseRequest {
  ownerId: string
  dogId: string
  checkInDate: Date
  checkOutDate: Date
}

type CreateAccommodationUseCaseResponse = Either<
  ResourceNotFoundError,
  { accommodation: Accommodation }
>

@Injectable()
export class CreateAccommodationUseCase {
  constructor(
    private accommodationsRepository: AccommodationsRepository,
    private ownersRepository: OwnersRepository,
    private dogsRepository: DogsRepository,
  ) {}

  async execute({
    ownerId,
    dogId,
    checkInDate,
    checkOutDate,
  }: CreateAccommodationUseCaseRequest): Promise<CreateAccommodationUseCaseResponse> {
    const owner = await this.ownersRepository.findById(ownerId)

    if (!owner) {
      return left(new ResourceNotFoundError())
    }

    const dog = await this.dogsRepository.findById(dogId)

    if (!dog) {
      return left(new ResourceNotFoundError())
    }

    const accommodation = Accommodation.create({
      ownerId: new UniqueEntityID(ownerId),
      dogId: new UniqueEntityID(dogId),
      checkInDate,
      checkOutDate,
    })

    await this.accommodationsRepository.create(accommodation)

    return right({
      accommodation,
    })
  }
}
