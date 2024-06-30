import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DogProps {
  ownerId: UniqueEntityID
  name: string
  gender: string
  size: string
  breed: string
  birthdate: Date
  isNeutered: boolean
  isTreatedAgainstTicks: Date
  isTreatedAgainstWorms: Date
  vaccinesCard: string

  createdAt: Date
  updatedAt?: Date | null
}

export class Dog extends Entity<DogProps> {
  private changes: Partial<DogProps> = {}

  get ownerId() {
    return this.props.ownerId
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.setIfChanged('name', name)
  }

  get gender() {
    return this.props.gender
  }

  set gender(gender: string) {
    this.setIfChanged('gender', gender)
  }

  get size() {
    return this.props.size
  }

  set size(size: string) {
    this.setIfChanged('size', size)
  }

  get breed() {
    return this.props.breed
  }

  set breed(breed: string) {
    this.setIfChanged('breed', breed)
  }

  get birthdate() {
    return this.props.birthdate
  }

  set birthdate(birthdate: Date) {
    this.setIfChanged('birthdate', birthdate)
  }

  get isNeutered() {
    return this.props.isNeutered
  }

  set isNeutered(isNeutered: boolean) {
    this.setIfChanged('isNeutered', isNeutered)
  }

  get isTreatedAgainstTicks() {
    return this.props.isTreatedAgainstTicks
  }

  set isTreatedAgainstTicks(isTreatedAgainstTicks: Date) {
    this.setIfChanged('isTreatedAgainstTicks', isTreatedAgainstTicks)
  }

  get isTreatedAgainstWorms() {
    return this.props.isTreatedAgainstWorms
  }

  set isTreatedAgainstWorms(isTreatedAgainstWorms: Date) {
    this.setIfChanged('isTreatedAgainstWorms', isTreatedAgainstWorms)
  }

  get vaccinesCard() {
    return this.props.vaccinesCard
  }

  set vaccinesCard(vaccinesCard: string) {
    this.setIfChanged('vaccinesCard', vaccinesCard)
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  getChanges(): Partial<DogProps> {
    return this.changes
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  isModified(): boolean {
    return Object.keys(this.changes).length > 0
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

  private setIfChanged<T extends keyof DogProps>(
    property: T,
    value: DogProps[T],
  ) {
    if (this.props[property] !== value) {
      this.props[property] = value
      this.changes[property] = value
      this.touch()
    }
  }
}
