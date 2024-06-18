import { Accommodation } from '@/domain/customers/enterprise/entities/Accommodation'

export class HttpAccommodationPresenter {
  static toHTTP(accommodation: Accommodation) {
    return {
      id: accommodation.id.toString(),
      ownerId: accommodation.ownerId.toString(),
      dogId: accommodation.dogId.toString(),
      checkInDate: accommodation.checkInDate,
      checkOutDate: accommodation.checkOutDate,
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
    }
  }
}
