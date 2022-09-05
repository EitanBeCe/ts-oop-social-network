import { PostsCodableServerFormat } from '../models/post';

export const transformPosts = (posts: {}, data: PostsCodableServerFormat) => {
  const list = [];
  for (let key in posts) {
    list.push({
      id: key,
      text: data[key as keyof PostsCodableServerFormat].text,
      ownerId: data[key as keyof PostsCodableServerFormat].ownerId,
      created_at: data[key as keyof PostsCodableServerFormat].created_at,
      updated_at: data[key as keyof PostsCodableServerFormat].updated_at,
    });
  }
};
