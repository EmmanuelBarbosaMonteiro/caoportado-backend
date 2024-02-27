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
}
