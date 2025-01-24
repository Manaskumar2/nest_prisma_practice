import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuthService } from './google-auth.service';

@Injectable()
export class GoogleCalendarService {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  async createEvent(eventDetails: any) {
    const authClient = this.googleAuthService.getAuthClient();
    const calendar = google.calendar({ version: 'v3', auth: authClient });

    const event = {
      summary: eventDetails.summary,
      location: eventDetails.location,
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startDateTime,
        timeZone: eventDetails.timeZone,
      },
      end: {
        dateTime: eventDetails.endDateTime,
        timeZone: eventDetails.timeZone,
      },
      attendees: eventDetails.attendees,
      reminders: {
        useDefault: true,
      },
      conferenceData: {
        createRequest: {
          requestId: `sample-request-id-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet', // Google Meet
          },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1, // To include conference data (Google Meet link)
    });

    return response.data;
  }
}
