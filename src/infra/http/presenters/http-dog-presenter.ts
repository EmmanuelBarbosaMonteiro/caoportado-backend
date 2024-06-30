import { Dog } from '@/domain/customers/enterprise/entities/dog'

export class HttpDogPresenter {
  static toHTTP(dog: Dog) {
    return {
      id: dog.id.toString(),
      ownerId: dog.ownerId.toString(),
      name: dog.name,
      gender: dog.gender,
      breed: dog.breed,
      size: dog.size,
      isTreatedAgainstTicks: dog.isTreatedAgainstTicks,
      isTreatedAgainstWorms: dog.isTreatedAgainstWorms,
      isNeutered: dog.isNeutered,
      birthdate: dog.birthdate,
      vaccinesCard: dog.vaccinesCard,
    }
  }

  static toHTTPDogs(dog: Dog) {
    return {
      id: dog.id.toString(),
      ownerId: dog.ownerId.toString(),
      name: dog.name,
      gender: dog.gender,
      breed: dog.breed,
      size: dog.size,
      isTreatedAgainstTicks: dog.isTreatedAgainstTicks,
      isTreatedAgainstWorms: dog.isTreatedAgainstWorms,
      isNeutered: dog.isNeutered,
      birthdate: dog.birthdate,
    }
  }
}
