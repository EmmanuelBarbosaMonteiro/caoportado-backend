import { DogRepository } from '@/core/domain/customers/application/repositories/dog-repository'
import { Dog } from '@/core/domain/customers/enterprise/entities/dog'

export class InMemoryDogRepository implements DogRepository {
  public items: Dog[] = []

  async create(dog: Dog) {
    this.items.push(dog)
  }
}
