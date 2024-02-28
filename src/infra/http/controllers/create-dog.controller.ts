import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateDogUseCase } from '@/domain/customers/application/use-cases/create-dog'

const createDogBodySchema = z.object({
  name: z.string(),
})

type CreateDogBodySchema = z.infer<typeof createDogBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createDogBodySchema)

@Controller('/dogs')
export class CreateDogController {
  constructor(private createDog: CreateDogUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateDogBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name } = body
    const userId = user.sub

    const result = await this.createDog.execute({
      ownerId: userId,
      name,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
