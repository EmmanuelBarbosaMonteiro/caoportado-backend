import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DogProps {
  ownerId: UniqueEntityID
  name: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Dog extends Entity<DogProps> {
  get ownerId() {
    return this.props.ownerId
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<DogProps, 'createdAt'>, id?: UniqueEntityID) {
    const dog = new Dog(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return dog
  }
}
