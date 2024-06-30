import { InMemoryDogsRepository } from 'test/repositories/in-memory-dog-repository'
import { makeDog } from 'test/factories/make-dog'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { GetDogByIdPerOwnerUseCase } from './get-dog-per-owner'

let inMemoryDogsRepository: InMemoryDogsRepository
let sut: GetDogByIdPerOwnerUseCase

describe('Get Dog By ID Per Owner', () => {
  beforeEach(() => {
    inMemoryDogsRepository = new InMemoryDogsRepository()
    sut = new GetDogByIdPerOwnerUseCase(inMemoryDogsRepository)
  })

  it('should be able to get a dog by id and owner', async () => {
    const dog = makeDog(
      {
        ownerId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('1'),
    )

    inMemoryDogsRepository.create(dog)

    const result = await sut.execute({
      ownerId: '1',
      dogId: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      dog: {
        id: dog.id,
        ownerId: dog.ownerId,
      },
    })
  })

  it('should return ResourceNotFoundError if dog does not exist', async () => {
    const result = await sut.execute({
      ownerId: '1',
      dogId: '999',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should return NotAllowedError if ownerId does not match', async () => {
    const dog = makeDog(
      { ownerId: new UniqueEntityID('2') },
      new UniqueEntityID('1'),
    )

    inMemoryDogsRepository.create(dog)

    const result = await sut.execute({
      ownerId: '1',
      dogId: '1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
