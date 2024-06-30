import { OwnersRepository } from '@/domain/customers/application/repositories/owner-repository'
import { Owner } from '@/domain/customers/enterprise/entities/owner'

export class InMemoryOwnersRepository implements OwnersRepository {
  public items: Owner[] = []

  async findByEmail(email: string): Promise<Owner | null> {
    const owner = this.items.find((item) => item.email === email)

    if (!owner) {
      return null
    }

    return owner
  }

  async findById(ownerId: string): Promise<Owner | null> {
    const owner = this.items.find((item) => item.id.toString() === ownerId)

    if (!owner) {
      return null
    }

    return owner
  }

  async create(owner: Owner) {
    this.items.push(owner)
  }
}
