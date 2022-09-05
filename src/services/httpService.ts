import { PostCodable } from '../models/post.js';
import { AccountCodable } from '../models/account.js';
import { ResponseCodable } from '../models/response.js';

// https://www.youtube.com/watch?v=-oey4jgc22k ТИПЫ В ФЕТЧЕ
export class Fetch {
  static async GET<T>(url: string): Promise<ResponseCodable<T>> {
    const response = await fetch(url);
    try {
      // console.log(response);
      const data = (await response.json()) as T; //as T

      const responseCodable: ResponseCodable<T> = {
        data: data,
        status: response.status,
      };

      console.log('GET: ', responseCodable);
      // console.log('GET: ' + JSON.stringify(data));

      if (!response.ok) {
        throw new Error('Data was not fetched');
      }

      return responseCodable;
      // return data;
    } catch (error) {
      console.dir(error);

      // https://www.youtube.com/watch?v=0GLYiJUBz6k ОШИБКИ И ТИПЫ
      const responseCodable: ResponseCodable<T> = {
        // errors: [
        //   {
        //     code: response,
        //     message: error.message,
        //   },
        // ],
        status: response.status,
      };

      return responseCodable;
    }
  }

  static async POST(url: string, body: AccountCodable | PostCodable) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    try {
      const data = await response.json();
      console.log('POST: ' + JSON.stringify(data));
      if (!response.ok) {
        throw new Error();
      }
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async PUT(url: string, body: any) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    try {
      const data = await response.json();
      console.log('PUT: ' + JSON.stringify(data));
      if (!response.ok) {
        throw new Error();
      }
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

// for (let key in data) {
//   console.log({
//     id: key,
//     name: data[key].name,
//     password: data[key].password,
//   });

// for (let key in data) {
//   newArr.push({
//     id: key,
//     name: data[key].name,
//     description: data[key].description,
//   });
// }
