import { Post } from '../models/post.js';
import { User } from '../models/registerUser.js';

export const fetchPOST = async (url: string, body: User | Post) => {
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
};

export const fetchGET = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log('GET: ' + JSON.stringify(data));
  // for (let key in data) {
  //   console.log({
  //     id: key,
  //     name: data[key].name,
  //     password: data[key].password,
  //   });

  // if (response.ok) {
  return data;
  // }

  // }
};

//   if (!response.ok) {
//     throw new Error('Something went wrong');
//   }
