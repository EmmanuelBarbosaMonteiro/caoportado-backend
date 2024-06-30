import { Dog, DogProps } from '@/domain/customers/enterprise/entities/dog'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'

export function makeDog(override: Partial<DogProps> = {}, id?: UniqueEntityID) {
  const dog = Dog.create(
    {
      ownerId: new UniqueEntityID(),
      name: faker.animal.dog(),
      gender: 'Male',
      size: 'Medium',
      breed: 'Labrador',
      birthdate: new Date('2022-01-01'),
      isNeutered: false,
      isTreatedAgainstTicks: new Date('2022-01-01'),
      isTreatedAgainstWorms: new Date('2022-01-01'),
      vaccinesCard: 'Vaccines Card',
      ...override,
    },
    id,
  )

  return dog
}
