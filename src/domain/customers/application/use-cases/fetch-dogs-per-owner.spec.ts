import { InMemoryDogsRepository } from 'test/repositories/in-memory-dog-repository'
import { makeDog } from 'test/factories/make-dog'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchDogsPerOwnerUseCase } from './fetch-dogs-per-owner'

let inMemoryDogsRepository: InMemoryDogsRepository
let sut: FetchDogsPerOwnerUseCase

describe('Fetch Dogs Per Owner', () => {
  beforeEach(() => {
    inMemoryDogsRepository = new InMemoryDogsRepository()
    sut = new FetchDogsPerOwnerUseCase(inMemoryDogsRepository)
  })

  it('should be able to to fetch dogs per owner', async () => {
    await inMemoryDogsRepository.create(
      makeDog({
        createdAt: new Date(2022, 0, 20),
        ownerId: new UniqueEntityID('owner-1'),
      }),
    )

    await inMemoryDogsRepository.create(
      makeDog({
        createdAt: new Date(2022, 0, 18),
        ownerId: new UniqueEntityID('owner-1'),
      }),
    )

    await inMemoryDogsRepository.create(
      makeDog({
        createdAt: new Date(2022, 0, 23),
        ownerId: new UniqueEntityID('owner-1'),
      }),
    )

    await inMemoryDogsRepository.create(
      makeDog({
        createdAt: new Date(2022, 0, 23),
        ownerId: new UniqueEntityID('owner-2'),
      }),
    )

    const result = await sut.execute({
      ownerId: 'owner-1',
      page: 1,
    })

    expect(result.value?.dogs).toHaveLength(3)
    expect(result.value?.dogs).toEqual([
      expect.objectContaining({
        createdAt: new Date(2022, 0, 23),
        ownerId: new UniqueEntityID('owner-1'),
      }),
      expect.objectContaining({
        createdAt: new Date(2022, 0, 20),
        ownerId: new UniqueEntityID('owner-1'),
      }),
      expect.objectContaining({
        createdAt: new Date(2022, 0, 18),
        ownerId: new UniqueEntityID('owner-1'),
      }),
    ])
  })
})
