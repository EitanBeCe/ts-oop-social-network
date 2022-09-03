export interface PostList {
  list: Post[];
}
export interface Post {
  id?: string;
  text: string;
  owner: string;
  created_at: Date;
  updated_at?: Date;
}
