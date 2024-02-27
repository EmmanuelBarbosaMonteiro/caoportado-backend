import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/dogs')
@UseGuards(JwtAuthGuard)
export class FetchDogsRegisterPerOwnerController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const perPage = 2

    const userId = user.sub

    const dogs = await this.prisma.dog.findMany({
      where: {
        ownerId: userId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { dogs }
  }
}
