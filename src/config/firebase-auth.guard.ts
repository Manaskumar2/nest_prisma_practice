// firebase-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers?.authorization;

    // Validate Authorization header
    if (!authorization) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    try {
      const decodedToken =
        await this.firebaseAuthService.verifyToken(authorization);
      request.user = decodedToken; // Attach decoded token to request
      return true;
    } catch (error: any) {
      console.error('Firebase Token Verification Error:', error);

      // Check for Firebase error codes and throw specific exceptions
      if (error.code === 'auth/id-token-expired') {
        throw new UnauthorizedException('Token has expired.');
      } else if (error.code === 'auth/argument-error') {
        throw new UnauthorizedException('Invalid token format.');
      } else {
        throw new UnauthorizedException(
          'Unauthorized Access - Token Verification Failed',
        );
      }
    }
  }
}
