import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchDogsPerOwnerUseCase } from '@/domain/customers/application/use-cases/fetch-dogs-per-owner'
import { HttpDogPresenter } from '../presenters/http-dog-presenter'

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
  constructor(private fetchDogPerOwner: FetchDogsPerOwnerUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    const result = await this.fetchDogPerOwner.execute({
      ownerId: userId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const dogs = result.value?.dogs

    return { dogs: dogs?.map(HttpDogPresenter.toHTTP) }
  }
}
