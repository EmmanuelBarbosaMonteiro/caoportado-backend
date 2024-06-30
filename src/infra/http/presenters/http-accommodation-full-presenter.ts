import { Accommodation } from '@/domain/customers/enterprise/entities/Accommodation'

export class HttpAccommodationFullPresenter {
  static toHTTP(accommodation: Accommodation) {
    return {
      id: accommodation.id.toString(),
      ownerId: accommodation.ownerId.toString(),
      dogId: accommodation.dogId.toString(),
      checkInDate: accommodation.checkInDate,
      checkOutDate: accommodation.checkOutDate,
      status: accommodation.status,
      isPaid: accommodation.isPaid,
      createdAt: accommodation.createdAt,
      updatedAt: accommodation.updatedAt,
      dog: {
        name: accommodation.dog?.name,
        gender: accommodation.dog?.gender,
        size: accommodation.dog?.size,
        breed: accommodation.dog?.breed,
        birthdate: accommodation.dog?.birthdate,
        isNeutered: accommodation.dog?.isNeutered,
        isTreatedAgainstTicks: accommodation.dog?.isTreatedAgainstTicks,
        isTreatedAgainstWorms: accommodation.dog?.isTreatedAgainstWorms,
        vaccinesCard: accommodation.dog?.vaccinesCard,
      },
      owner: {
        firstName: accommodation.owner?.firstName,
        lastName: accommodation.owner?.lastName,
        email: accommodation.owner?.email,
      },
    }
  }

  static toHTTPAccomodations(accommodation: Accommodation, dogName: string) {
    return {
      id: accommodation.id.toString(),
      ownerId: accommodation.ownerId.toString(),
      dogId: accommodation.dogId.toString(),
      dogName,
      checkInDate: accommodation.checkInDate,
      checkOutDate: accommodation.checkOutDate,
      status: accommodation.status,
      isPaid: accommodation.isPaid,
      createdAt: accommodation.createdAt,
      updatedAt: accommodation.updatedAt,
      dog: {
        name: accommodation.dog?.name,
        gender: accommodation.dog?.gender,
        size: accommodation.dog?.size,
        breed: accommodation.dog?.breed,
        birthdate: accommodation.dog?.birthdate,
        isNeutered: accommodation.dog?.isNeutered,
        isTreatedAgainstTicks: accommodation.dog?.isTreatedAgainstTicks,
        isTreatedAgainstWorms: accommodation.dog?.isTreatedAgainstWorms,
        vaccinesCard: accommodation.dog?.vaccinesCard,
        ownerId: accommodation.dog?.ownerId.toString(),
      },
      owner: {
        firstName: accommodation.owner?.firstName,
        lastName: accommodation.owner?.lastName,
        email: accommodation.owner?.email,
      },
    }
  }
}
