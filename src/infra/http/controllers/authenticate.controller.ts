import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { AuthenticateOwnerUseCase } from '@/domain/customers/application/use-cases/authenticate-owner'
import { WrongCredentialsError } from '@/domain/customers/application/use-cases/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

const bodyValidatetionPipe = new ZodValidationPipe(authenticateBodySchema)

@Controller('/sessions')
@Public()
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
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
