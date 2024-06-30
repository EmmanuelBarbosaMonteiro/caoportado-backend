import { Owner } from '@/domain/customers/enterprise/entities/owner'

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export class HttpOwnerPresenter {
  static toHTTP(owner: Owner) {
    return {
      id: owner.id.toString(),
      name:
        capitalizeFirstLetter(owner.firstName) +
        ' ' +
        capitalizeFirstLetter(owner.lastName),
      email: owner.email,
      createdAt: owner.createdAt,
      dogsCount: owner.dogs ? owner.dogs.length : 0,
      accommodationsCount: owner.accommodations
        ? owner.accommodations.length
        : 0,
    }
  }

  static toHTTPList(owners: Owner[]) {
    return owners.map((owner) => HttpOwnerPresenter.toHTTP(owner))
  }
}
