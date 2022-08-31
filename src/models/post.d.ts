export interface PostList {
  list: Post[];
}
export interface Post {
  id?: string; // ? - because when user creates a post there is no id, and it then creates automatically on Firebase
  text: string;
}
