import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch dogs register per owner (E2E)', () => {
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

  test('[GET] /dogs', async () => {
    const customer = await prisma.customer.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: customer.id })

    await prisma.dog.createMany({
      data: [
        {
          name: 'Dog 01',
          ownerId: customer.id,
          gender: 'Male',
          size: 'Medium',
          breed: 'Labrador',
          birthdate: '2022-01-01T00:00:00.000Z',
          isNeutered: false,
          isTreatedAgainstTicks: '2022-01-01T00:00:00.000Z',
          isTreatedAgainstWorms: '2022-01-01T00:00:00.000Z',
          vaccinesCard: 'Vaccines Card',
        },
        {
          name: 'Dog 02',
          ownerId: customer.id,
          gender: 'Male',
          size: 'Medium',
          breed: 'Labrador',
          birthdate: '2022-01-01T00:00:00.000Z',
          isNeutered: false,
          isTreatedAgainstTicks: '2022-01-01T00:00:00.000Z',
          isTreatedAgainstWorms: '2022-01-01T00:00:00.000Z',
          vaccinesCard: 'Vaccines Card',
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/dogs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      dogs: [
        expect.objectContaining({ name: 'Dog 01' }),
        expect.objectContaining({ name: 'Dog 02' }),
      ],
    })
  })
})
