import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { RegisterOwnerUseCase } from '@/domain/customers/application/use-cases/register-owner'
import { OwnerAlreadyExistsError } from '@/domain/customers/application/use-cases/errors/owner-alredy-exists-error'
import { Public } from '@/infra/auth/public'

const createAccountBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

const bodyValidatetionPipe = new ZodValidationPipe(createAccountBodySchema)

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerOwner: RegisterOwnerUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidatetionPipe) body: CreateAccountBodySchema) {
    const { firstName, lastName, email, password } = body

    const result = await this.registerOwner.execute({
      firstName,
      lastName,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OwnerAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
