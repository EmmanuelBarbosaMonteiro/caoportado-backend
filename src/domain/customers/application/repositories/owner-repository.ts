import { Owner } from '../../enterprise/entities/owner'

export abstract class StudentsRepository {
  abstract findByEmail(email: string): Promise<Owner | null>
  abstract create(student: Owner): Promise<void>
}
