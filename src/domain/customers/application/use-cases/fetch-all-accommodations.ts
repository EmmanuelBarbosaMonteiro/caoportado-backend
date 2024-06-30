import { Either, left, right } from '@/core/either'
import { Accommodation } from '../../enterprise/entities/Accommodation'
import { AccommodationsRepository } from '../repositories/accommodation-repository'
import { OwnersRepository } from '../repositories/owner-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface FetchAllAccommodationsUseCaseRequest {
  pageIndex: number
  dogName: string
  accommodationStatus: string
  userId: string
}

type FetchAllAccommodationsUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    accommodations: Accommodation[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number
    }
  }
>

@Injectable()
export class FetchAllAccommodationsUseCase {
  constructor(
    private accommodations: AccommodationsRepository,
    private owners: OwnersRepository,
  ) {}

  async execute({
    pageIndex,
    dogName,
    accommodationStatus,
    userId,
  }: FetchAllAccommodationsUseCaseRequest): Promise<FetchAllAccommodationsUseCaseResponse> {
    const isAdmin = await this.owners.findById(userId)

    if (!isAdmin) {
      return left(new ResourceNotFoundError())
    }

    if (isAdmin.role !== 'ADMIN') {
      return left(new NotAllowedError())
    }

    const { accommodations, meta } = await this.accommodations.findAll(
      pageIndex,
      dogName,
      accommodationStatus,
    )

    return right({
      accommodations,
      meta: {
        pageIndex: meta.pageIndex,
        perPage: meta.perPage,
        totalCount: meta.totalCount,
      },
    })
  }
}
