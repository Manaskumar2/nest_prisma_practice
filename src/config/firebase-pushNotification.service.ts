import { Injectable } from '@nestjs/common';
import { firebaseAdmin } from './firebase.config';
import { TokenMessage } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class PushNotificationService {
  constructor() { }



  async sendPushNotification(deviceToken:string, notificationData: any): Promise<void> {
    try {


      // Create the message payload
      const message = {
        data: {
          title: notificationData.title,
          body: notificationData.body,
          tag: notificationData.notificationType,
          referenceId: String(notificationData.referenceId),
        },
        token: deviceToken,
      }
      // Send the push notificatio
      const response = await firebaseAdmin.messaging().send(message);
      console.log('Push notification sent successfully:', response);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
}
