import { Dog, DogProps } from '@/domain/customers/enterprise/entities/dog'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'

export function makeDog(override: Partial<DogProps> = {}, id?: UniqueEntityID) {
  const dog = Dog.create(
    {
      ownerId: new UniqueEntityID(),
      name: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return dog
}
