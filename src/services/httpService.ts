import { post } from '../models/post.js';
import { registerUser } from '../models/registerUser.js';

export const fetchPost = async (url: string, body: registerUser | post) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    return data.name;
  }
};

export const fetchGet = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  for (let key in data) {
    console.log({
      id: key,
      name: data[key].name,
      password: data[key].password,
    });
    if (response.ok) {
      return data.name;
    }
  }
};

//   if (!response.ok) {
//     throw new Error('Something went wrong');
//   }
