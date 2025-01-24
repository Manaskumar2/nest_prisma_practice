// firebase.module.ts
import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';
import { FirebaseAuthController } from './firebase-auth.controller';
import { UserService } from 'src/user/user.service';
import { ResponseService } from 'src/core/response/response.service';
import { PushNotificationService } from './firebase-pushNotification.service';

@Module({
  providers: [FirebaseAuthService, UserService,ResponseService,PushNotificationService],
  controllers: [FirebaseAuthController],
  exports: [FirebaseAuthService, UserService,ResponseService,PushNotificationService], // Export to make it available in other modules
})
export class FirebaseModule {}
