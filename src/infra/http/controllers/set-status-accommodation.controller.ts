import { z } from 'zod'
import { StatusAccommodation } from '@/domain/customers/enterprise/entities/Accommodation'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { SetStatusAccommodationUseCase } from '@/domain/customers/application/use-cases/set-status-accommodation'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { HttpAccommodationFullPresenter } from '../presenters/http-accommodation-full-presenter'

export const setStatusAccommodationBodySchema = z.object({
  accommodationId: z.string().uuid(),
  accommodationStatus: z.enum([
    StatusAccommodation.PENDING,
    StatusAccommodation.APPROVED,
    StatusAccommodation.CANCELLED,
  ]),
})

export type SetStatusAccommodationBodySchema = z.infer<
  typeof setStatusAccommodationBodySchema
>

const bodyValidationPipe = new ZodValidationPipe(
  setStatusAccommodationBodySchema,
)

@Controller('/accommodations')
export class SetStatusAccommodationController {
  constructor(private setStatusAccommodation: SetStatusAccommodationUseCase) {}

  @Post('/status')
  async handle(
    @Body(bodyValidationPipe) body: SetStatusAccommodationBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { accommodationId, accommodationStatus } = body
    const userId = user.sub

    const result = await this.setStatusAccommodation.execute({
      accommodationId,
      userId,
      accommodationStatus,
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

    const accommodation = result.value.accommodation

    return {
      accommodation: HttpAccommodationFullPresenter.toHTTP(accommodation),
    }
  }
}
