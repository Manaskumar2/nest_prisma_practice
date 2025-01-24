import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';
import { UserService } from 'src/user/user.service';
import { Request as ExpressRequest } from 'express'; // Import from Express
import { ResponseService } from 'src/core/response/response.service';
import { PushNotificationService } from './firebase-pushNotification.service';

@Controller('auth')
export class FirebaseAuthController {
  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
    private readonly pushNotificationService : PushNotificationService
  ) {}

  @Post('verify')
  async verifyToken(@Request() req: ExpressRequest) {
    try {
      // Extract Authorization header
      const authorization = req.headers?.authorization;

      // Validate Authorization header
      if (!authorization) {
        throw new UnauthorizedException(
          'Missing or invalid Authorization header',
        );
      }

      // Verify the token using Firebase Auth Service
      const decodedToken =
        await this.firebaseAuthService.verifyToken(authorization);
      const userDetails = await this.userService.findOne(decodedToken.uid);

      return {
        message: 'Token verified successfully!',
        user: userDetails,
      };
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Endpoint to create a new user
   */
  @Post('signup')
  async signup(@Body() body: { email: string; password: string ,deviceToken:string}) {
    const { email, password ,deviceToken} = body;
    const user = await this.firebaseAuthService.createUser(email, password);
    const notification = await this.pushNotificationService.sendPushNotification(deviceToken, { title: 'Welcome', body: 'You have been registered successfully', notificationType: 'WELCOME', referenceId: user.uid });


    return this.responseService.success({ ...user }, 'Data created successfully');
    
  }

}
