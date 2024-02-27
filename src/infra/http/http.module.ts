import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateDogController } from './controllers/create-dog.controller'
import { FetchDogsRegisterPerOwnerController } from './controllers/fetch-dogs-register-per-owner.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateDogUseCase } from '@/domain/customers/application/use-cases/create-dog'
import { FetchDogsPerOwnerUseCase } from '@/domain/customers/application/use-cases/fetch-dogs-per-owner'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateDogController,
    FetchDogsRegisterPerOwnerController,
  ],
  providers: [CreateDogUseCase, FetchDogsPerOwnerUseCase],
})
export class HttpModule {}
