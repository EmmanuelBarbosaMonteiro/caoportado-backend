import { Accommodation } from '../../enterprise/entities/Accommodation'

export abstract class AccommodationsRepository {
  abstract create(Accommodation: Accommodation): Promise<void>
  abstract findById(accommodationId: string): Promise<Accommodation | null>
  abstract findAllByOwner(ownerId: string): Promise<Accommodation[]>

  abstract findAll(
    pageIndex: number,
    dogName: string,
    accommodationStatus: string,
  ): Promise<{
    accommodations: Accommodation[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number
    }
  }>

  abstract update(Accommodation: Accommodation): Promise<void>
  abstract delete(id: string): Promise<void>
}
