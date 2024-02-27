import { Dog } from '@/domain/customers/enterprise/entities/dog'

export class HttpDogPresenter {
  static toHTTP(dog: Dog) {
    return {
      id: dog.id.toString(),
      name: dog.name,
      ownerId: dog.ownerId.toString(),
      createdAt: dog.createdAt,
      updatedAt: dog.updatedAt,
    }
  }
}
