import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Owner, OwnerProps } from '@/domain/customers/enterprise/entities/owner'
import { faker } from '@faker-js/faker'

export function makeOwner(
  override: Partial<OwnerProps> = {},
  id?: UniqueEntityID,
) {
  const owner = Owner.create(
    {
      firstName: faker.person.fullName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return owner
}
