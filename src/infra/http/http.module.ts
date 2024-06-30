import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateDogController } from './controllers/create-dog.controller'
import { FetchDogsRegisterPerOwnerController } from './controllers/fetch-dogs-register-per-owner.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateDogUseCase } from '@/domain/customers/application/use-cases/create-dog'
import { FetchDogsPerOwnerUseCase } from '@/domain/customers/application/use-cases/fetch-dogs-per-owner'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { RegisterOwnerUseCase } from '@/domain/customers/application/use-cases/register-owner'
import { AuthenticateOwnerUseCase } from '@/domain/customers/application/use-cases/authenticate-owner'
import { CreateAccommodationUseCase } from '@/domain/customers/application/use-cases/create-accommodation'
import { EditDogUseCase } from '@/domain/customers/application/use-cases/edit-dog'
import { EditDogController } from './controllers/edit-dog.controller'
import { DeleteDogController } from './controllers/delete-dog.controller'
import { DeleteDogUseCase } from '@/domain/customers/application/use-cases/delete-dog'
import { GetDogByIdPerOwnerController } from './controllers/get-dog-by-id-per-owner.controller'
import { GetDogByIdPerOwnerUseCase } from '@/domain/customers/application/use-cases/get-dog-per-owner'
import { CreateAccommodationController } from './controllers/create-accommodation.controller'
import { FetchAccommodationPerOwnerController } from './controllers/fetch-accommodation-per-owner.controller'
import { FetchAccommodationPerOwnerUseCase } from '@/domain/customers/application/use-cases/fetch-accommodation-per-owner'
import { FetchAllOwnersController } from './controllers/fetch-owners.controller'
import { FetchAllOwnersUseCase } from '@/domain/customers/application/use-cases/fetch-all-owners'
import { FetchAllAccommodationsController } from './controllers/fetch-all-accommodations.controller'
import { FetchAllAccommodationsUseCase } from '@/domain/customers/application/use-cases/fetch-all-accommodations'
import { SetStatusAccommodationController } from './controllers/set-status-accommodation.controller'
import { SetStatusAccommodationUseCase } from '@/domain/customers/application/use-cases/set-status-accommodation'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    EditDogController,
    DeleteDogController,
    AuthenticateController,
    CreateDogController,
    FetchDogsRegisterPerOwnerController,
    CreateAccommodationController,
    GetDogByIdPerOwnerController,
    FetchAccommodationPerOwnerController,
    FetchAllOwnersController,
    FetchAllAccommodationsController,
    SetStatusAccommodationController,
  ],
  providers: [
    CreateDogUseCase,
    EditDogUseCase,
    DeleteDogUseCase,
    FetchDogsPerOwnerUseCase,
    RegisterOwnerUseCase,
    AuthenticateOwnerUseCase,
    CreateAccommodationUseCase,
    GetDogByIdPerOwnerUseCase,
    FetchAccommodationPerOwnerUseCase,
    FetchAllOwnersUseCase,
    FetchAllAccommodationsUseCase,
    SetStatusAccommodationUseCase,
  ],
})
export class HttpModule {}
