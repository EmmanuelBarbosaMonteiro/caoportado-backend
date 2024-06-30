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
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import { FetchAllOwnersUseCase } from '@/domain/customers/application/use-cases/fetch-all-owners'
import { HttpOwnerPresenter } from '../presenters/http-owner-presenter'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { NotFoundError } from 'rxjs'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const customerNameQueryParamSchema = z.string().optional().default('')

const queryValidationSchema = z.object({
  page: pageQueryParamSchema,
  customerName: customerNameQueryParamSchema,
})

type QueryValidationSchema = z.infer<typeof queryValidationSchema>

const queryValidationPipe = new ZodValidationPipe(queryValidationSchema)

@Controller('/owners')
export class FetchAllOwnersController {
  constructor(private fetchAllOwnersUseCase: FetchAllOwnersUseCase) {}

  @Get()
  async handle(
    @Query(queryValidationPipe) query: QueryValidationSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub
    const { page, customerName } = query

    const result = await this.fetchAllOwnersUseCase.execute({
      pageIndex: page,
      customerName,
      userId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case NotFoundError:
          throw new NotFoundException(error.message)
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { owners, meta } = result.value

    return {
      owners: owners.map(HttpOwnerPresenter.toHTTP),
      meta,
    }
  }
}
