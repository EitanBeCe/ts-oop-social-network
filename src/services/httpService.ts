import { Post } from '../models/post.js';
import { User } from '../models/registerUser.js';

export class Fetch {
  static async POST(url: string, body: User | Post) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log('POST: ' + JSON.stringify(data));
    if (response.ok) {
      return data;
    }
  }

  static async GET(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    console.log('GET: ' + JSON.stringify(data));

    return data;
  }
}

// export const fetchPOST = async (url: string, body: User | Post) => {
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });
//   const data = await response.json();
//   console.log('POST: ' + JSON.stringify(data));
//   if (response.ok) {
//     return data;
//   }
// };

// export const fetchGET = async (url: string) => {
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log('GET: ' + JSON.stringify(data));

//   return data;
// };

//   if (!response.ok) {
//     throw new Error('Something went wrong');
//   }

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
