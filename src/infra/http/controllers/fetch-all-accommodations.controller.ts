import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { FetchAllAccommodationsUseCase } from '@/domain/customers/application/use-cases/fetch-all-accommodations'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import { HttpAccommodationFullPresenter } from '../presenters/http-accommodation-full-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const dogNameQueryParamSchema = z.string().optional().default('')

const accommodationStatusQueryParamSchema = z.string().optional().default('')

const queryValidationSchema = z.object({
  page: pageQueryParamSchema,
  dogName: dogNameQueryParamSchema,
  accommodationStatus: accommodationStatusQueryParamSchema,
})

type QueryValidationSchema = z.infer<typeof queryValidationSchema>

const queryValidationPipe = new ZodValidationPipe(queryValidationSchema)

@Controller('/accommodations')
export class FetchAllAccommodationsController {
  constructor(
    private fetchAllAccommodationsUseCase: FetchAllAccommodationsUseCase,
  ) {}

  @Get()
  async handle(
    @Query(queryValidationPipe) query: QueryValidationSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub
    const { page, dogName, accommodationStatus } = query

    const result = await this.fetchAllAccommodationsUseCase.execute({
      pageIndex: page,
      dogName,
      accommodationStatus,
      userId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accommodations, meta } = result.value

    return {
      accommodations: accommodations.map((accommodation) =>
        HttpAccommodationFullPresenter.toHTTP(accommodation),
      ),
      meta,
    }
  }
}
