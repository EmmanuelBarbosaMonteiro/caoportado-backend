import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create dog (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await prisma.$disconnect()
    await app.close()
  })

  test('[POST] /dogs', async () => {
    const customer = await prisma.customer.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: customer.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/dogs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Snoopy',
        gender: 'Male',
        size: 'Medium',
        breed: 'Labrador',
        birthdate: '2022-01-01',
        isNeutered: false,
        isTreatedAgainstTicks: '2022-01-01',
        isTreatedAgainstWorms: '2022-01-01',
        vaccinesCard: 'Vaccines Card',
      })

    expect(response.statusCode).toBe(201)

    const dogOnDatabase = await prisma.dog.findFirst({
      where: {
        name: 'Snoopy',
        ownerId: customer.id,
      },
    })

    expect(dogOnDatabase).toBeTruthy()
  })
})
