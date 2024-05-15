import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

export interface FirebaseApiError {
  code: HttpStatusCode;
  message: string;
}

export class FirebaseApiErrorFactory {
  public static fromResponse(response: HttpErrorResponse): FirebaseApiError {
    return {
      code: response.error.error.code,
      message: FirebaseApiExceptionMapper.map(response.error.error.message),
    }
  };
}

class FirebaseApiExceptionMapper {
  public static map(errorMessage: string): string {
    switch (errorMessage) {
      case FirebaseApiErrorCodes.INVALID_LOGIN_CREDENTIALS:
        return "Invalid login credentials";
      case FirebaseApiErrorCodes.EMAIL_EXISTS:
        return "Email already exists";
      default:
        return "Unknown error occurred: " + errorMessage;
    }
  }
}

export enum FirebaseApiErrorCodes {
  INVALID_LOGIN_CREDENTIALS = "INVALID_LOGIN_CREDENTIALS",
  EMAIL_EXISTS = "EMAIL_EXISTS",
}
