import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { InMemoryDogsRepository } from 'test/repositories/in-memory-dog-repository'
import { DeleteDogUseCase } from './delete-dog'
import { makeDog } from 'test/factories/make-dog'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryDogsRepository: InMemoryDogsRepository
let sut: DeleteDogUseCase

describe('Delete Dog', () => {
  beforeEach(() => {
    inMemoryDogsRepository = new InMemoryDogsRepository()
    sut = new DeleteDogUseCase(inMemoryDogsRepository)
  })

  it('should be able to delete a dog', async () => {
    const dog = makeDog()
    await inMemoryDogsRepository.create(dog)

    const result = await sut.execute({
      dogId: dog.id.toString(),
      ownerId: dog.ownerId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDogsRepository.items).toHaveLength(0)
  })

  it('should return ResourceNotFoundError if dog does not exist', async () => {
    const result = await sut.execute({
      dogId: 'non-existent',
      ownerId: '1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should return NotAllowedError if ownerId does not match', async () => {
    const dog = makeDog({
      ownerId: new UniqueEntityID('1'),
    })
    await inMemoryDogsRepository.create(dog)

    const result = await sut.execute({
      dogId: dog.id.toString(),
      ownerId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
