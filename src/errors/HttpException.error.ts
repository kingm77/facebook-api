export const HttpStatus = {
    NOT_FOUND: 404,
    UNAUTHORIZED: 401
  }
  
  export class HttpException extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
      super(message);

      this.statusCode = statusCode;
    }
  }