import { InMemoryDogRepository } from 'test/repositories/in-memory-dog-repository'
import { CreateDogUseCase } from './create-dog'

let inMemoryDogRepository: InMemoryDogRepository
let sut: CreateDogUseCase

describe('Create Dog', () => {
  beforeEach(() => {
    inMemoryDogRepository = new InMemoryDogRepository()
    sut = new CreateDogUseCase(inMemoryDogRepository)
  })

  it('should be able to create a dog', async () => {
    const result = await sut.execute({
      ownerId: '1',
      name: 'New Dog',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDogRepository.items[0]).toEqual(result.value?.dog)
  })
})
