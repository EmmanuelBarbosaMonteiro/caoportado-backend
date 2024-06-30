import { Owner } from '../../enterprise/entities/owner'

export abstract class OwnersRepository {
  abstract findByEmail(email: string): Promise<Owner | null>
  abstract findById(ownerId: string): Promise<Owner | null>

  abstract findAll(
    customerName: string,
    pageIndex: number,
  ): Promise<{
    owners: Owner[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number
    }
  }>

  abstract create(owner: Owner): Promise<void>
}
