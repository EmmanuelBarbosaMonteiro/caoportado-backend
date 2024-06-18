import { Accommodation } from '../../enterprise/entities/Accommodation'

export abstract class AccommodationsRepository {
  abstract create(Accommodation: Accommodation): Promise<void>
  abstract findById(ownerId: string): Promise<Accommodation | null>
  abstract findAll(ownerId: string): Promise<Accommodation[]>
  abstract update(Accommodation: Accommodation): Promise<void>
  abstract delete(id: string): Promise<void>
}
