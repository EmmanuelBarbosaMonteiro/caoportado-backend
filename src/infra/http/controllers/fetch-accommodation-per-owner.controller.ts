import { Controller, Get, NotFoundException } from '@nestjs/common'
import { FetchAccommodationPerOwnerUseCase } from '@/domain/customers/application/use-cases/fetch-accommodation-per-owner'
import { UserPayload } from '@/infra/auth/jwt.stratedy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { HttpAccommodationPresenter } from '../presenters/http-Accommodation-presenter'
import { GetDogByIdPerOwnerUseCase } from '@/domain/customers/application/use-cases/get-dog-per-owner'

@Controller('/accommodation')
export class FetchAccommodationPerOwnerController {
  constructor(
    private fetchAccommodationPerOwner: FetchAccommodationPerOwnerUseCase,
    private getDogByIdPerOwner: GetDogByIdPerOwnerUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const ownerId = user.sub

    const result = await this.fetchAccommodationPerOwner.execute({
      ownerId,
    })

    if (result.isLeft()) {
      throw new NotFoundException(result.value)
    }

    const accommodations = result.value.accommodations

    const accommodationsWithDogNames = await Promise.all(
      accommodations.map(async (accommodation) => {
        const dogResult = await this.getDogByIdPerOwner.execute({
          dogId: accommodation.dogId.toString(),
          ownerId,
        })

        if (dogResult.isLeft()) {
          throw new NotFoundException(dogResult.value)
        }

        const dog = dogResult.value.dog
        return HttpAccommodationPresenter.toHTTPAccomodations(
          accommodation,
          dog.name,
        )
      }),
    )

    return {
      accommodations: accommodationsWithDogNames,
    }
  }
}
