import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateAccommodationUseCase } from '@/domain/customers/application/use-cases/create-accommodation'
import { HttpAccommodationPresenter } from '../presenters/http-Accommodation-presenter'

const createAccommodationBodySchema = z.object({
  dogId: z.string(),
  checkInDate: z.string().refine(
    (data) => {
      return !isNaN(new Date(data).getTime())
    },
    { message: 'Invalid date format for checkInDate' },
  ),
  checkOutDate: z.string().refine(
    (data) => {
      return !isNaN(new Date(data).getTime())
    },
    { message: 'Invalid date format for checkOutDate' },
  ),
})

type CreateAccommodationBodySchema = z.infer<
  typeof createAccommodationBodySchema
>

const bodyValidationPipe = new ZodValidationPipe(createAccommodationBodySchema)

@Controller('/accommodation')
export class CreateAccommodationController {
  constructor(private createAccommodation: CreateAccommodationUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateAccommodationBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { dogId, checkInDate, checkOutDate } = body
    const ownerId = user.sub

    const result = await this.createAccommodation.execute({
      ownerId,
      dogId,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value)
    }

    const accommodation = result.value.accommodation

    return { accommodation: HttpAccommodationPresenter.toHTTP(accommodation) }
  }
}
