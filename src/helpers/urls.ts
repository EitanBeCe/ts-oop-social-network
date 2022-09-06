export const urlFirebase = 'https://nathan-test-c723c-default-rtdb.firebaseio.com/api/v1_0';
// reqres.in ???

export const urlAcc = `${urlFirebase}/account.json`;
export const urlAccPut = (accId: string) => {
  return `${urlFirebase}/account/${accId}.json`;
};

export const urlPosts = `${urlFirebase}/post.json`;
export const urlPostsPutOrDel = (postId: string) => {
  return `${urlFirebase}/post/${postId}.json`;
};

export const urlComments = (postId: string) => {
  return `${urlFirebase}/post/${postId}/comment.json`;
};
export const urlCommentsPutOrDel = (postId: string, commId: string) => {
  return `${urlFirebase}/post/${postId}/comment/${commId}.json`;
};
