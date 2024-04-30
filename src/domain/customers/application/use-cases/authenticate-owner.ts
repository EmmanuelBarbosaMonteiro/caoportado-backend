import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { OwnersRepository } from '../repositories/owner-repository'

interface AuthenticateOwnerUseCaseRequest {
  email: string
  password: string
}

type AuthenticateOwnerUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateOwnerUseCase {
  constructor(
    private ownersRepository: OwnersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateOwnerUseCaseRequest): Promise<AuthenticateOwnerUseCaseResponse> {
    const owner = await this.ownersRepository.findByEmail(email)

    if (!owner) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      owner.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: owner.id.toString(),
      name: owner.firstName.toString().toUpperCase(),
      email: owner.email.toString().toLowerCase(),
    })

    return right({
      accessToken,
    })
  }
}
