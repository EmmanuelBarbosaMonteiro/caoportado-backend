import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { RegisterOwnerUseCase } from '@/domain/customers/application/use-cases/register-owner'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

const bodyValidatetionPipe = new ZodValidationPipe(createAccountBodySchema)

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerOwner: RegisterOwnerUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidatetionPipe) body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerOwner.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      throw new Error()
    }
  }
}
