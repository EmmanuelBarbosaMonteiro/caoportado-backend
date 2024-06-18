import {
  Accommodation,
  AccommodationProps,
} from '@/domain/customers/enterprise/entities/accommodation'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeAccommodation(
  override: Partial<AccommodationProps> = {},
  id?: UniqueEntityID,
) {
  const dogId = new UniqueEntityID('5711c258-dfb4-474d-b003-f82d058e3691')
  const checkInDate = new Date()
  const checkOutDate = new Date(checkInDate.getTime() + 86400000) // Adiciona 24 horas à checkInDate para obter a saída
  const isPaid = new Date(checkOutDate.getTime() + 86400000) // Adiciona mais 24 horas para obter a data de isPaid

  const accommodation = Accommodation.create(
    {
      ownerId: new UniqueEntityID(),
      dogId,
      checkInDate,
      checkOutDate,
      isPaid,
      ...override,
    },
    id,
  )

  return accommodation
}
