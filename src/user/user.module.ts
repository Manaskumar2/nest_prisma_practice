import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseModule } from 'src/config/firebase.module'; // Import FirebaseModule here
import { FirebaseAuthGuard } from 'src/config/firebase-auth.guard';

@Module({
  imports: [FirebaseModule], // FirebaseModule should be in the imports array
  controllers: [UserController],
  providers: [UserService, FirebaseAuthGuard], // FirebaseAuthGuard is a provider, no need to use FirebaseModule in the controllers
})
export class UserModule {}
