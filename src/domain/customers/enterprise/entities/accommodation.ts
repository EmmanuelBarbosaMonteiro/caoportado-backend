// Accommodation.ts

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { OwnerProps } from './owner'
import { DogProps } from './dog'

export enum StatusAccommodation {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
}

export interface AccommodationProps {
  ownerId: UniqueEntityID
  dogId: UniqueEntityID
  status: StatusAccommodation
  checkInDate: Date
  checkOutDate: Date
  isPaid?: Date | null

  owner?: OwnerProps
  dog?: DogProps

  createdAt: Date
  updatedAt?: Date | null
}

export class Accommodation extends Entity<AccommodationProps> {
  get ownerId() {
    return this.props.ownerId
  }

  get dogId() {
    return this.props.dogId
  }

  get status() {
    return this.props.status
  }

  setStatus(newStatus: StatusAccommodation) {
    this.props.status = newStatus
    this.props.updatedAt = new Date()
  }

  get checkInDate() {
    return this.props.checkInDate
  }

  get checkOutDate() {
    return this.props.checkOutDate
  }

  get isPaid() {
    return this.props.isPaid
  }

  get dog() {
    return this.props.dog
  }

  get owner() {
    return this.props.owner
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<AccommodationProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const accomodation = new Accommodation(
      {
        ...props,
        status: props.status ?? StatusAccommodation.PENDING,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return accomodation
  }
}
