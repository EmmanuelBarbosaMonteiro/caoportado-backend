import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateDogUseCase } from '@/domain/customers/application/use-cases/create-dog'
import { HttpDogPresenter } from '../presenters/http-dog-presenter'

const createDogBodySchema = z.object({
  name: z.string(),
  gender: z.string(),
  size: z.string(),
  breed: z.string(),
  birthdate: z.string().refine(
    (data) => {
      return !isNaN(new Date(data).getTime())
    },
    {
      message: 'Invalid date format for birthdate',
    },
  ),
  isNeutered: z.boolean(),
  isTreatedAgainstTicks: z.string().refine(
    (data) => {
      return !isNaN(new Date(data).getTime())
    },
    {
      message: 'Invalid date format for isTreatedAgainstTicks',
    },
  ),
  isTreatedAgainstWorms: z.string().refine(
    (data) => {
      return !isNaN(new Date(data).getTime())
    },
    {
      message: 'Invalid date format for isTreatedAgainstWorms',
    },
  ),
  vaccinesCard: z.string(),
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
    const {
      name,
      gender,
      size,
      breed,
      birthdate,
      isNeutered,
      isTreatedAgainstTicks,
      isTreatedAgainstWorms,
      vaccinesCard,
    } = body
    const userId = user.sub

    const result = await this.createDog.execute({
      ownerId: userId,
      name,
      gender,
      size,
      breed,
      birthdate: new Date(birthdate),
      isNeutered,
      isTreatedAgainstTicks: new Date(isTreatedAgainstTicks),
      isTreatedAgainstWorms: new Date(isTreatedAgainstWorms),
      vaccinesCard,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const dog = result.value.dog

    return { dog: HttpDogPresenter.toHTTP(dog) }
  }
}
