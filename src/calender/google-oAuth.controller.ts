import { Controller, Get, Post, Query, Redirect, Body } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleCalendarService } from './calender.service';


@Controller('google')
export class GoogleAuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly googleCalendarService: GoogleCalendarService
  ) {}

  @Get('auth')
  @Redirect()
  getAuthUrl() {
    const url = this.googleAuthService.generateAuthUrl();
    return { url };
  }

  @Get('callback')
  async handleCallback(@Query('code') code: string) {
    try {
      const tokens = await this.googleAuthService.getTokens(code);
      return { success: true, tokens };
    } catch (error) {
      return { success: false, message: 'Failed to handle callback', error: error.message };
    }
  }

  @Post('event')
  async createEvent(@Body() eventDetails: any) {
    try {
      const event = await this.googleCalendarService.createEvent( eventDetails);
      return { success: true, message: 'Event created successfully', event };
    } catch (error) {
      return { success: false, message: 'Failed to create event', error: error.message };
    }
  }
}
