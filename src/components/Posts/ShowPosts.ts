import { urlPosts } from '../../helpers/urls.js';
import { PostsCodable, PostsCodableServerFormat } from '../../models/post.js';
import { Fetch } from '../../services/httpService.js';
import { EditPost } from './EditPost.js';

export class ShowPosts {
  // posts: string[];
  posts: PostsCodable;
  contentEl: HTMLDivElement;

  constructor(public firstRender: boolean = true) {
    this.contentEl = document.getElementById('app')! as HTMLDivElement;
    this.posts = { list: [] };
    this.fetchPosts();
  }

  private async fetchPosts() {
    return await Fetch.GET<PostsCodableServerFormat>(urlPosts)
      .then((data) => {
        const list = [];
        const postsData = data.data;

        // Мб проще передать функцию трансформа в ГЕТ
        // https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-expression#:~:text=The%20error%20%22Element%20implicitly%20has,one%20of%20the%20object's%20keys.
        if (postsData) {
          for (let key in postsData) {
            list.push({
              id: key,
              text: postsData[key as keyof PostsCodableServerFormat].text,
              ownerId: postsData[key as keyof PostsCodableServerFormat].ownerId,
              created_at: postsData[key as keyof PostsCodableServerFormat].created_at,
              updated_at: postsData[key as keyof PostsCodableServerFormat].updated_at,
            });
          }
        } else {
          // error
        }

        this.posts.list = list;
        console.log('PostsList:', this.posts);

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
