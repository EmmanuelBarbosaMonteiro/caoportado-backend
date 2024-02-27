// import { PaginationParams } from '@/core/repositories/pagination-params'

import { Dog } from '../../enterprise/entities/dog'

export abstract class DogRepository {
  abstract create(dog: Dog): Promise<void>
}
