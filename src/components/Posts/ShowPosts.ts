import { urlPosts } from '../../helpers/urls.js';
import { PostList } from '../../models/post.js';
import { Fetch } from '../../services/httpService.js';
import { EditPost } from './EditPost.js';

export class ShowPosts {
  // posts: string[];
  posts: PostList;
  contentEl: HTMLDivElement;

  constructor(public firstRender: boolean = true) {
    this.contentEl = document.getElementById('app')! as HTMLDivElement;
    this.posts = { list: [] };
    this.fetchPosts();
  }

  private async fetchPosts() {
    return await Fetch.GET(urlPosts)
      .then((data) => {
        const list = [];
        for (let key in data) {
          list.push({
            id: key,
            text: data[key].text,
            owner: data[key].owner,
            created_at: data[key].created_at,
          });
        }
        this.posts.list = list;
        console.log(this.posts);

        this.append(this.firstRender);

        return this.posts;
      })
      .then((postsArr) => new EditPost(postsArr));
  }

  private append(firstTimeRender: boolean) {
    // 'firstTimeRender' - Create a new list when entering or update existing list after adding a post
    if (firstTimeRender === true) {
      // Appending ul
      const ulEl = document.createElement('div');
      ulEl.innerHTML = `
          <ul id="postlist">
          </ul>
        `;
      this.contentEl.insertAdjacentElement('beforeend', ulEl);

      // Appending all li
      const ulElem = document.getElementById('postlist');
      this.posts.list.forEach((el) => {
        const liPost = document.createElement('li');
        liPost.id = el.id!;
        liPost.textContent = `${el.text}`;
        ulElem!.append(liPost);
      });
    } else {
      const ulElem = document.getElementById('postlist');
      ulElem!.innerHTML = '';

      // Appending all li
      this.posts.list.forEach((el) => {
        const liPost = document.createElement('li');
        liPost.id = el.id!;
        liPost.textContent = `${el.text}`;
        ulElem!.append(liPost);
      });
    }
  }
}
