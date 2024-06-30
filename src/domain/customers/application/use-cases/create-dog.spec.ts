import { InMemoryDogsRepository } from 'test/repositories/in-memory-dog-repository'
import { CreateDogUseCase } from './create-dog'
import { InMemoryOwnersRepository } from 'test/repositories/in-memory-owner-repository'
import { makeOwner } from 'test/factories/make-owner'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryDogsRepository: InMemoryDogsRepository
let inMemoryOwnersRepository: InMemoryOwnersRepository
let sut: CreateDogUseCase

describe('Create Dog', () => {
  beforeEach(() => {
    inMemoryDogsRepository = new InMemoryDogsRepository()
    inMemoryOwnersRepository = new InMemoryOwnersRepository()
    sut = new CreateDogUseCase(inMemoryDogsRepository, inMemoryOwnersRepository)
  })

  it('should be able to create a dog', async () => {
    const ownerId = 'valid-owner-id'

    inMemoryOwnersRepository.items.push(
      makeOwner({}, new UniqueEntityID(ownerId)),
    )

    const result = await sut.execute({
      ownerId: 'valid-owner-id',
      name: 'New Dog',
      gender: 'Male',
      size: 'Medium',
      breed: 'Labrador',
      birthdate: new Date('2022-01-01'),
      isNeutered: false,
      isTreatedAgainstTicks: new Date('2022-01-01'),
      isTreatedAgainstWorms: new Date('2022-01-01'),
      vaccinesCard: 'Vaccines Card',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDogsRepository.items[0].ownerId.toString()).toEqual(ownerId)
  })

  it('should return ResourceNotFoundError', async () => {
    const result = await sut.execute({
      ownerId: 'invalid-owner-id',
      name: 'New Dog',
      gender: 'Male',
      size: 'Medium',
      breed: 'Labrador',
      birthdate: new Date('2022-01-01'),
      isNeutered: false,
      isTreatedAgainstTicks: new Date('2022-01-01'),
      isTreatedAgainstWorms: new Date('2022-01-01'),
      vaccinesCard: 'Vaccines Card',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
