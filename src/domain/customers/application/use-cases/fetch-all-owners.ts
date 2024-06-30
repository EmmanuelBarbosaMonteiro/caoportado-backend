import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Owner } from '../../enterprise/entities/owner'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { OwnersRepository } from '../repositories/owner-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchAllOwnersUseCaseRequest {
  pageIndex: number
  customerName: string
  userId: string
}

type FetchAllOwnersUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    owners: Owner[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number
    }
  }
>

@Injectable()
export class FetchAllOwnersUseCase {
  constructor(private owners: OwnersRepository) {}

  async execute({
    pageIndex,
    customerName,
    userId,
  }: FetchAllOwnersUseCaseRequest): Promise<FetchAllOwnersUseCaseResponse> {
    const isAdmin = await this.owners.findById(userId)

    if (!isAdmin) {
      return left(new ResourceNotFoundError())
    }

    if (isAdmin.role !== 'ADMIN') {
      return left(new NotAllowedError())
    }

    const { owners, meta } = await this.owners.findAll(customerName, pageIndex)

    return right({
      owners,
      meta: {
        pageIndex: meta.pageIndex,
        perPage: meta.perPage,
        totalCount: meta.totalCount,
      },
    })
  }
}
