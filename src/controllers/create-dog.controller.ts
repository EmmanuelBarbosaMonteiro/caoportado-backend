import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/auth/current-user-decorator'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { UserPayload } from '@/auth/jwt.stratedy'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const createDogBodySchema = z.object({
  name: z.string(),
})

type CreateDogBodySchema = z.infer<typeof createDogBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createDogBodySchema)

@Controller('/dogs')
@UseGuards(JwtAuthGuard)
export class CreateDogController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateDogBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name } = body
    const userId = user.sub

    await this.prisma.dog.create({
      data: {
        ownerId: userId,
        name,
      },
    })
  }
}
