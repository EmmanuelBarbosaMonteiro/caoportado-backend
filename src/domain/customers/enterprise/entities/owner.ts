import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface OwnerProps {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Owner extends Entity<OwnerProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<OwnerProps, 'createdAt'>, id?: UniqueEntityID) {
    const owner = new Owner(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return owner
  }
}
