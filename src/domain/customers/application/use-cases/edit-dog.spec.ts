import { InMemoryDogsRepository } from 'test/repositories/in-memory-dog-repository'
import { EditDogUseCase } from './edit-dog'
import { makeDog } from 'test/factories/make-dog'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryDogsRepository: InMemoryDogsRepository
let sut: EditDogUseCase

describe('Edit Dog', () => {
  beforeEach(() => {
    inMemoryDogsRepository = new InMemoryDogsRepository()
    sut = new EditDogUseCase(inMemoryDogsRepository)
  })

  it('should be able to edit a dog', async () => {
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
      name: 'New Dog',
      gender: 'Female',
      size: 'Small',
      breed: 'Poodle',
      birthdate: new Date('2023-01-01'),
      isNeutered: true,
      isTreatedAgainstTicks: new Date('2023-01-01'),
      isTreatedAgainstWorms: new Date('2023-01-01'),
      vaccinesCard: 'New Vaccines Card',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDogsRepository.items[0]).toMatchObject({
      name: 'New Dog',
      gender: 'Female',
      size: 'Small',
      breed: 'Poodle',
      birthdate: new Date('2023-01-01'),
      isNeutered: true,
      isTreatedAgainstTicks: new Date('2023-01-01'),
      isTreatedAgainstWorms: new Date('2023-01-01'),
      vaccinesCard: 'New Vaccines Card',
    })
  })

  it('should return ResourceNotFoundError if dog does not exist', async () => {
    const result = await sut.execute({
      ownerId: '1',
      dogId: '999',
      name: 'New Dog',
      gender: 'Female',
      size: 'Small',
      breed: 'Poodle',
      birthdate: new Date('2023-01-01'),
      isNeutered: true,
      isTreatedAgainstTicks: new Date('2023-01-01'),
      isTreatedAgainstWorms: new Date('2023-01-01'),
      vaccinesCard: 'New Vaccines Card',
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
      name: 'New Dog',
      gender: 'Female',
      size: 'Small',
      breed: 'Poodle',
      birthdate: new Date('2023-01-01'),
      isNeutered: true,
      isTreatedAgainstTicks: new Date('2023-01-01'),
      isTreatedAgainstWorms: new Date('2023-01-01'),
      vaccinesCard: 'New Vaccines Card',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
