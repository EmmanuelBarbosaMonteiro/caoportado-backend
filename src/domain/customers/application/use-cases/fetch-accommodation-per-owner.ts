import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Accommodation } from '../../enterprise/entities/Accommodation'
import { Injectable } from '@nestjs/common'
import { AccommodationsRepository } from '../repositories/accommodation-repository'
import { OwnersRepository } from '../repositories/owner-repository'

interface FetchAccommodationPerOwnerUseCaseRequest {
  ownerId: string
}

type FetchAccommodationPerOwnerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    accommodations: Accommodation[]
  }
>

@Injectable()
export class FetchAccommodationPerOwnerUseCase {
  constructor(
    private accommodations: AccommodationsRepository,
    private owners: OwnersRepository,
  ) {}

  async execute({
    ownerId,
  }: FetchAccommodationPerOwnerUseCaseRequest): Promise<FetchAccommodationPerOwnerUseCaseResponse> {
    const owner = await this.owners.findById(ownerId)

    if (!owner) {
      return left(new ResourceNotFoundError())
    }

    const accommodations = await this.accommodations.findAll(ownerId)

    return right({ accommodations })
  }
}
