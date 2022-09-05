import { PostCodable } from '../models/post.js';
import { AccountCodable } from '../models/account.js';
import { ResponseCodable } from '../models/response.js';
import { Err } from '../helpers/errors.js';
import { Try } from '../helpers/tryResponse.js';

type bodyTypes = AccountCodable | PostCodable;

export class Fetch {
  static async GET<T>(url: string): Promise<ResponseCodable<T>> {
    const response = await fetch(url);
    try {
      return Try.response<T>(response, 'GET');
    } catch (error) {
      return Err.handler<T>(error, response);
    }
  }

  static async POST<T>(url: string, body: bodyTypes): Promise<ResponseCodable<T>> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    try {
      return Try.response<T>(response, 'POST');
    } catch (error) {
      return Err.handler<T>(error, response);
    }
  }

  static async PUT<T>(url: string, body: bodyTypes): Promise<ResponseCodable<T>> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    try {
      return Try.response<T>(response, 'PUT');
    } catch (error) {
      return Err.handler<T>(error, response);
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
