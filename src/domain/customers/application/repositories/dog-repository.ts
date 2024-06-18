import { PaginationParams } from '@/core/repositories/pagination-params'
import { Dog } from '../../enterprise/entities/dog'

export abstract class DogsRepository {
  abstract create(dog: Dog): Promise<void>
  abstract findMany(id: string, params: PaginationParams): Promise<Dog[]>
  abstract findDogsByIds(id: string[], params: PaginationParams): Promise<Dog[]>
  abstract findById(id: string): Promise<Dog | null>
  abstract save(dog: Dog): Promise<void>
  abstract delete(id: string): Promise<void>
}
