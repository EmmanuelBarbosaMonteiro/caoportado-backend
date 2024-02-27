import { PaginationParams } from '@/core/repositories/pagination-params'

import { Dog } from '../../enterprise/entities/dog'

export abstract class DogsRepository {
  abstract create(dog: Dog): Promise<void>
  abstract findMany(id: string, params: PaginationParams): Promise<Dog[]>
}
