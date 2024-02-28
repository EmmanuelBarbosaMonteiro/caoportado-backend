import { AppModule } from '@/infra/app.module'
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
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /dogs', async () => {
    const customer = await prisma.customer.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: customer.id })

    const response = await request(app.getHttpServer())
      .post('/dogs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Snoopy',
      })

    expect(response.statusCode).toBe(201)

    const questionOnDatabase = await prisma.dog.findFirst({
      where: {
        name: 'Snoopy',
      },
    })

    expect(questionOnDatabase).toBeTruthy()
  })
})
