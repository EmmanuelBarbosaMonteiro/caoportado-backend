import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { HttpDogPresenter } from '../presenters/http-dog-presenter'
import { GetDogByIdPerOwnerUseCase } from '@/domain/customers/application/use-cases/get-dog-per-owner'
import { UserPayload } from '@/infra/auth/jwt.stratedy'

const getDogByIdPerOwnerParamsSchema = z.object({
  dogId: z.string().uuid(),
})

type GetDogByIdPerOwnerParamsSchema = z.infer<
  typeof getDogByIdPerOwnerParamsSchema
>

const paramsValidationPipe = new ZodValidationPipe(
  getDogByIdPerOwnerParamsSchema,
)

@Controller('/dogs')
export class GetDogByIdPerOwnerController {
  constructor(private getDogByIdPerOwner: GetDogByIdPerOwnerUseCase) {}

  @Get(':dogId')
  async handle(
    @Param(paramsValidationPipe) params: GetDogByIdPerOwnerParamsSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { dogId } = params
    const userId = user.sub

    const result = await this.getDogByIdPerOwner.execute({
      dogId,
      ownerId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value)
    }

    const dog = result.value.dog

    return { dog: HttpDogPresenter.toHTTP(dog) }
  }
}
