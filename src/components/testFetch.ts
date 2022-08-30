// // const testEl = document.getElementById('test')! as HTMLDivElement;
// // const nameInput = document.getElementById('name')! as HTMLInputElement;
// // const passwordInput = document.getElementById('password')! as HTMLInputElement;
// // const button = document.querySelector('button')! as HTMLButtonElement;

// const urlMock = 'https://4608dde7-1bff-47c6-bb11-4f84c71d6c5e.mock.pstmn.io/api/v1.0/account';
// const urlFirebas = 'https://nathan-test-c723c-default-rtdb.firebaseio.com/account.json'; ///api/v1.0/account.json
// const urlPostCheck = 'http://httpbin.org/post';

// const fetchTestPost = async () => {
//   const response = await fetch(urlFirebas, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: nameInput.value,
//       password: passwordInput.value,
//     }),
//   });
//   //   if (!response.ok) {
//   //     throw new Error('Something went wrong');
//   //   }
//   const data = await response.json();
//   console.log(data);

//   // testEl.innerText = data.username;
//   // testEl.innerText = data.json.name;
// };
// const fetchTestGet = async () => {
//   const response = await fetch(urlFirebas);
//   //   if (!response.ok) {
//   //     throw new Error('Something went wrong');
//   //   }
//   const data = await response.json();
//   console.log(data);
// };

// button.addEventListener('click', () => {
//   console.log('Clicked');
//   console.log(nameInput.value);
//   fetchTestGet();
// });

// // fetchTest().catch((error) => {});
