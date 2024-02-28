import { Body, Controller, Post } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { AuthenticateOwnerUseCase } from '@/domain/customers/application/use-cases/authenticate-owner'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

const bodyValidatetionPipe = new ZodValidationPipe(authenticateBodySchema)

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateOwner: AuthenticateOwnerUseCase) {}

  @Post()
  async handle(@Body(bodyValidatetionPipe) body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateOwner.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
