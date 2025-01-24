import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { FirebaseModule } from './config/firebase.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseService } from './core/response/response.service';
import { ResponseInterceptor } from './core/response/response.intercepter';
// import { OrderModule } from './order/order.module';
import {GoogleCalendarService } from './calender/calender.service';
import { CalendarModule } from './calender/calender.module';

@Module({
  imports: [DatabaseModule, UserModule, ProductModule, FirebaseModule,CalendarModule],

controllers: [],
  providers: [
    ResponseService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    GoogleCalendarService,
  ],
})
export class AppModule {}
