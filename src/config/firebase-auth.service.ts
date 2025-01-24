import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { firebaseAdmin } from './firebase.config'; // Ensure you're importing firebaseAdmin correctly.
// import axios from 'axios';
@Injectable()
export class FirebaseAuthService {
  private readonly firebaseApiKey = process.env.FIREBASE_API_KEY; // Store in environment variables
  /**
   * Verifies a Firebase ID token and returns the decoded token payload.
   *
   * @param token - The Firebase ID token to verify.
   * @returns The decoded token payload if the token is valid.
   * @throws UnauthorizedException if the token is expired, has an invalid format, or verification fails.
   */
  async verifyToken(token: string): Promise<any> {
    try {
      // Validate the Firebase ID token using firebaseAdmin
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      return decodedToken; // Return the decoded token payload
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

  /**
   * Sign in the user with email and password using Firebase Admin SDK.
   *
   * @param email - The user's email address.
   * @param _password - The user's password.
   * @returns The user record if the user is found, or throws an error if not.
   */
  async signInWithEmailAndPassword(email: string): Promise<any> {
    try {
      // Firebase Admin SDK does not directly authenticate with email/password on the server side.
      // So, you would typically handle that on the client side using Firebase Authentication SDK (web, Android, iOS).
      // On the server-side, you'd typically verify an ID token sent from the client.
      // But, for demonstration, if you only need to fetch user data by email:
      const userRecord = await firebaseAdmin.auth().getUserByEmail(email);

      // If the user is found, return the user record
      return userRecord;
    } catch (error: any) {
      console.error('Error signing in with email and password:', error);

      // Handle Firebase error appropriately
      if (error.code === 'auth/user-not-found') {
        throw new UnauthorizedException('User not found');
      } else {
        throw new UnauthorizedException('Authentication failed');
      }
    }
  }

  // async signUp(email: string, password: string): Promise<any> {
  //   try {
  //     const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseApiKey}`;

  //     const response = await axios.post(url, {
  //       email,
  //       password,
  //       returnSecureToken: true,
  //     });

  //     return response.data; // Returns user information and ID token
  //   } catch (error: any) {
  //     console.error('Firebase Signup Error:', error.response.data);

  //     if (error.response) {
  //       throw new BadRequestException(error.response.data.error.message);
  //     } else {
  //       throw new BadRequestException('Failed to sign up user.');
  //     }
  //   }
  // }
  async createUser(email: string, password: string): Promise<any> {
    try {
      const userRecord = await firebaseAdmin.auth().createUser({
        email,
        password,
      });
      return userRecord;
    } catch (error) {
      throw new BadRequestException(error.message); // Handle errors
    }
  }
}
