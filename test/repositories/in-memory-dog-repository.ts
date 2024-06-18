import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { DogsRepository } from '@/domain/customers/application/repositories/dog-repository'
import { Dog } from '@/domain/customers/enterprise/entities/dog'

export class InMemoryDogsRepository implements DogsRepository {
  public items: Dog[] = []

  async create(dog: Dog) {
    this.items.push(dog)
  }

  async findMany(id: string, { page }: PaginationParams) {
    const dogs = this.items
      .filter((item) => item.ownerId.toString() === id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return dogs
  }

  async findDogsByIds(
    id: string[],
    { page }: PaginationParams,
  ): Promise<Dog[]> {
    const dogs = this.items
      .filter((item) => id.includes(item.id.toString()))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return dogs
  }

  async findById(id: string): Promise<Dog | null> {
    const dog = this.items.find((item) => item.id.toString() === id)

    return dog || null
  }

  async save(dog: Dog): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === dog.id.toString(),
    )

    if (index !== -1) {
      this.items[index] = dog
    } else {
      this.items.push(dog)
    }
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === new UniqueEntityID(id),
    )

    this.items.splice(itemIndex, 1)
  }
}
