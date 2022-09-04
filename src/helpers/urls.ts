// const urlFirebase = 'https://nathan-test-c723c-default-rtdb.firebaseio.com/account.json';
// reqres.in ???

export const urlAcc = 'https://nathan-test-c723c-default-rtdb.firebaseio.com/api/v1_0/account.json';
export const urlAccPut = (accId: string) => {
  return `https://nathan-test-c723c-default-rtdb.firebaseio.com/api/v1_0/account/${accId}.json`;
};

export const urlPosts = 'https://nathan-test-c723c-default-rtdb.firebaseio.com/api/v1_0/post.json';
export const urlPostsPut = (postId: string) => {
  return `https://nathan-test-c723c-default-rtdb.firebaseio.com/api/v1_0/post/${postId}.json`;
};
