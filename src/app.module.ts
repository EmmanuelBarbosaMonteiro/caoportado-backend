import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@/env'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateDogController } from './controllers/create-dog.controller'
import { FetchDogsRegisterPerOwnerController } from './controllers/fetch-dogs-register-per-owner.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateDogController,
    FetchDogsRegisterPerOwnerController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
