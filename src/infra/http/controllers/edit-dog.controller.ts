import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
} from '@nestjs/common'
import { EditDogUseCase } from '@/domain/customers/application/use-cases/edit-dog'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import { HttpDogPresenter } from '../presenters/http-dog-presenter'

const editDogBodySchema = z.object({
  name: z.string(),
  gender: z.string(),
  size: z.string(),
  breed: z.string(),
  birthdate: z.string().refine(
    (data) => {
      return !isNaN(new Date(data).getTime())
    },
    { message: 'Invalid date format for birthdate' },
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

type EditDogBodySchema = z.infer<typeof editDogBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editDogBodySchema)

@Controller('/dogs')
export class EditDogController {
  constructor(private editDog: EditDogUseCase) {}

  @Put(':id')
  async handle(
    @Param('id') dogId: string,
    @Body(bodyValidationPipe) body: EditDogBodySchema,
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

    const result = await this.editDog.execute({
      ownerId: userId,
      dogId,
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
      throw new BadRequestException(result.value)
    }

    const dog = result.value.dog

    return { dog: HttpDogPresenter.toHTTP(dog) }
  }
}
