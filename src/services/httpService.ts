// const urlFirebase = 'https://nathan-test-c723c-default-rtdb.firebaseio.com/account.json'; //api/v1.0/account.json
import { registerUser } from '../models/registerUser';

export const fetchPost = async (url: string, body: registerUser) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
};

export const fetchGet = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};

//   if (!response.ok) {
//     throw new Error('Something went wrong');
//   }
