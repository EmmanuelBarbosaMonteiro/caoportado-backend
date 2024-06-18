import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export interface OwnerProps {
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role

  createdAt: Date
  updatedAt?: Date | null
}

export class Owner extends Entity<OwnerProps> {
  get lastName() {
    return this.props.lastName
  }

  get firstName() {
    return this.props.firstName
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<OwnerProps, 'createdAt' | 'role'>,
    id?: UniqueEntityID,
  ) {
    const owner = new Owner(
      {
        ...props,
        role: props.role ?? Role.CUSTOMER,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return owner
  }
}
