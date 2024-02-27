import { InMemoryDogsRepository } from 'test/repositories/in-memory-dog-repository'
import { CreateDogUseCase } from './create-dog'

let inMemoryDogsRepository: InMemoryDogsRepository
let sut: CreateDogUseCase

describe('Create Dog', () => {
  beforeEach(() => {
    inMemoryDogsRepository = new InMemoryDogsRepository()
    sut = new CreateDogUseCase(inMemoryDogsRepository)
  })

  it('should be able to create a dog', async () => {
    const result = await sut.execute({
      ownerId: '1',
      name: 'New Dog',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDogsRepository.items[0]).toEqual(result.value?.dog)
  })
})
