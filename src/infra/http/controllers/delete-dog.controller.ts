import { DeleteDogUseCase } from '@/domain/customers/application/use-cases/delete-dog'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/dogs/:id')
export class DeleteDogController {
  constructor(private deleteDog: DeleteDogUseCase) {}

  @Delete()
  @HttpCode(200)
  async handle(@CurrentUser() user: UserPayload, @Param('id') dogId: string) {
    const ownerId = user.sub

    const result = await this.deleteDog.execute({
      dogId,
      ownerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
