import { InMemoryAccommodationsRepository } from 'test/repositories/in-memory-accommodation-repository'
import { CreateAccommodationUseCase } from './create-Accommodation'
import { InMemoryDogsRepository } from 'test/repositories/in-memory-dog-repository'
import { InMemoryOwnersRepository } from 'test/repositories/in-memory-owner-repository'
import { makeOwner } from 'test/factories/make-owner'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeDog } from 'test/factories/make-dog'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryAccommodationsRepository: InMemoryAccommodationsRepository
let inMemoryOwnersRepository: InMemoryOwnersRepository
let inMemoryDogsRepository: InMemoryDogsRepository
let sut: CreateAccommodationUseCase

describe('Create Accommodation', () => {
  beforeEach(() => {
    inMemoryAccommodationsRepository = new InMemoryAccommodationsRepository()
    inMemoryOwnersRepository = new InMemoryOwnersRepository()
    inMemoryDogsRepository = new InMemoryDogsRepository()

    sut = new CreateAccommodationUseCase(
      inMemoryAccommodationsRepository,
      inMemoryOwnersRepository,
      inMemoryDogsRepository,
    )
  })

  it('should be able to create a Accommodation', async () => {
    const ownerId = 'valid-owner-id'
    const dogId = 'valid-dog-id'

    inMemoryOwnersRepository.items.push(
      makeOwner({}, new UniqueEntityID(ownerId)),
    )
    inMemoryDogsRepository.items.push(makeDog({}, new UniqueEntityID(dogId)))

    const result = await sut.execute({
      ownerId,
      dogId,
      checkInDate: new Date(),
      checkOutDate: new Date(),
      isPaid: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAccommodationsRepository.items).toHaveLength(1)
  })

  it('should return ResourceNotFoundError', async () => {
    const result = await sut.execute({
      ownerId: 'invalid-owner-id',
      dogId: 'valid-dog-id',
      checkInDate: new Date(),
      checkOutDate: new Date(),
      isPaid: new Date(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
