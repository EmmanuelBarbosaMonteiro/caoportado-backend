import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Edit dog (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /dogs/:id', async () => {
    const customer = await prisma.customer.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const dog = await prisma.dog.create({
      data: {
        ownerId: customer.id,
        name: 'Snoopy',
        gender: 'Male',
        size: 'Medium',
        breed: 'Labrador',
        birthdate: new Date('2022-01-01'),
        isNeutered: false,
        isTreatedAgainstTicks: new Date('2022-01-01'),
        isTreatedAgainstWorms: new Date('2022-01-01'),
        vaccinesCard: 'Vaccines Card',
      },
    })

    const accessToken = jwt.sign({ sub: customer.id })

    const response = await request(app.getHttpServer())
      .put(`/dogs/${dog.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Charlie',
        gender: 'Female',
        size: 'Small',
        breed: 'Poodle',
        birthdate: '2023-01-01',
        isNeutered: true,
        isTreatedAgainstTicks: '2023-01-01',
        isTreatedAgainstWorms: '2023-01-01',
        vaccinesCard: 'New Vaccines Card',
      })

    console.log('Response body teste 2:', response.body)
    expect(response.statusCode).toBe(200)

    const updatedDog = await prisma.dog.findUnique({
      where: { id: dog.id },
    })

    expect(updatedDog).toMatchObject({
      name: 'Charlie',
      gender: 'Female',
      size: 'Small',
      breed: 'Poodle',
      birthdate: new Date('2023-01-01'),
      isNeutered: true,
      isTreatedAgainstTicks: new Date('2023-01-01'),
      isTreatedAgainstWorms: new Date('2023-01-01'),
      vaccinesCard: 'New Vaccines Card',
    })
  })
})
