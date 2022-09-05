import { ResponseCodable } from '../models/response';

export class Try {
  static async response<T>(response: Response, responseType: string): Promise<ResponseCodable<T>> {
    // console.log(response);
    const data = (await response.json()) as T;

    const responseCodable: ResponseCodable<T> = {
      data: data,
      status: response.status,
    };
    console.log(`${responseType}`, responseCodable);
    // console.log(`${responseType}: ${JSON.stringify(data)}`);

    if (!response.ok) {
      throw new Error(`${responseType}: Data was not fetched`);
    }

    return responseCodable;
    // return data;
  }
}
