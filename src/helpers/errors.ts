import { ErrorCodable } from '../models/error';
import { ResponseCodable } from '../models/response';

export class Err {
  static getMessage(error: unknown): ErrorCodable {
    if (error instanceof Error)
      return {
        code: JSON.stringify(error),
        message: error.message,
      };
    return {
      code: JSON.stringify(error),
    };
  }

  static handler<T>(error: unknown, response: Response) {
    console.dir(error);
    const responseCodable: ResponseCodable<T> = {
      errors: [Err.getMessage(error)],
      status: response.status,
    };
    return responseCodable;
  }
}
