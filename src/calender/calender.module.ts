import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleCalendarService } from './calender.service';
import { GoogleAuthController } from './google-oAuth.controller';
@Module({
    providers: [GoogleCalendarService, GoogleAuthService], // Provide GoogleCalendarService
    controllers: [GoogleAuthController],
    exports: [GoogleCalendarService,GoogleAuthService], // Export if neede
})
export class CalendarModule {}
