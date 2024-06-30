import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AccommodationsRepository } from '@/domain/customers/application/repositories/accommodation-repository'
import { Accommodation } from '@/domain/customers/enterprise/entities/Accommodation'

export class InMemoryAccommodationsRepository
  implements AccommodationsRepository
{
  public items: Accommodation[] = []

  async create(Accommodation: Accommodation) {
    this.items.push(Accommodation)
  }

  async findById(id: UniqueEntityID) {
    return this.items.find((Accommodation) => Accommodation.id === id) || null
  }

  async findAll(ownerId: UniqueEntityID, { page }: PaginationParams) {
    const pageSize = 20
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize

    const hospedagensDoDono = this.items.filter(
      (Accommodation) => Accommodation.ownerId === ownerId,
    )

    return hospedagensDoDono.slice(startIndex, endIndex)
  }

  async update(Accommodation: Accommodation) {
    const index = this.items.findIndex((h) => h.id === Accommodation.id)
    if (index !== -1) {
      this.items[index] = Accommodation
    }
  }

  async delete(id: UniqueEntityID) {
    const index = this.items.findIndex(
      (Accommodation) => Accommodation.id === id,
    )
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
