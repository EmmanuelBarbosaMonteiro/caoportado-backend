import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import {
  Accommodation,
  StatusAccommodation,
} from '../../enterprise/entities/Accommodation'
import { AccommodationsRepository } from '../repositories/accommodation-repository'
import { OwnersRepository } from '../repositories/owner-repository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface SetStatusAccommodationUseCaseRequest {
  accommodationId: string
  userId: string
  accommodationStatus: StatusAccommodation
}

type SetStatusAccommodationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    accommodation: Accommodation
  }
>

@Injectable()
export class SetStatusAccommodationUseCase {
  constructor(
    private accommodations: AccommodationsRepository,
    private owners: OwnersRepository,
  ) {}

  async execute({
    accommodationId,
    userId,
    accommodationStatus,
  }: SetStatusAccommodationUseCaseRequest): Promise<SetStatusAccommodationUseCaseResponse> {
    const isAdmin = await this.owners.findById(userId)
    const isPresenterAccommodation =
      await this.accommodations.findById(accommodationId)

    if (!isAdmin || !isPresenterAccommodation) {
      return left(new ResourceNotFoundError())
    }

    if (isAdmin.role !== 'ADMIN') {
      return left(new NotAllowedError())
    }

    isPresenterAccommodation.setStatus(accommodationStatus)
    await this.accommodations.update(isPresenterAccommodation)

    return right({ accommodation: isPresenterAccommodation })
  }
}
