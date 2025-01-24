import * as admin from 'firebase-admin';
import serviceAccount from './firebase-adminsdk.json';
import { ServiceAccount } from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

// Export admin instance
export const firebaseAdmin = admin;
