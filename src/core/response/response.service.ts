import { Injectable } from "@nestjs/common";

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

@Injectable()
export class ResponseService {
  // Standard success response, without nesting the data structure
  success<T>(data: T, message = 'Request successful', statusCode = 200): ApiResponse<T> {
    return {
      statusCode,
      message,
      data,  // This should be the actual data (not wrapped again in an ApiResponse)
    };
  }

  // Standard error response
  error(message: string, statusCode = 400): ApiResponse<null> {
    return {
      statusCode,
      message,
    };
  }
}
