import { FakeEncrypter } from 'test/cryptography/fake-encrypte'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryOwnersRepository } from 'test/repositories/in-memory-owner-repository'
import { AuthenticateOwnerUseCase } from './authenticate-owner'
import { makeOwner } from 'test/factories/make-owner'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryOwnersRepository: InMemoryOwnersRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateOwnerUseCase

describe('Authenticate Owner', () => {
  beforeEach(() => {
    inMemoryOwnersRepository = new InMemoryOwnersRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new AuthenticateOwnerUseCase(
      inMemoryOwnersRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate a owner', async () => {
    const owner = await makeOwner({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryOwnersRepository.items.push(owner)

    const result = await sut.execute({
      email: owner.email,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should be rejected authentication of an owner with the wrong password', async () => {
    const owner = await makeOwner({
      password: await fakeHasher.hash('123456'),
    })

    inMemoryOwnersRepository.items.push(owner)

    const result = await sut.execute({
      email: owner.email,
      password: '12345678',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
