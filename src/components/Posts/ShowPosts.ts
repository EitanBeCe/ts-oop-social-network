import { urlPosts } from '../../helpers/urls.js';
import { PostsCodable, PostsCodableServerFormat } from '../../models/post.js';
import { Fetch } from '../../services/httpService.js';
import { EditPost } from './EditPost.js';

export class ShowPosts {
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

      this.liAppender(firstTimeRender);
    } else {
      this.liAppender(firstTimeRender);
    }
  }

  public liAppender(firstTimeRender: boolean) {
    const ulElem = document.getElementById('postlist');
    !firstTimeRender ? (ulElem!.innerHTML = '') : null;

    this.posts.list.forEach((el) => {
      const liPost = document.createElement('li');
      liPost.id = el.id!;
      liPost.style.marginBottom = '15px';
      liPost.innerHTML = `
        <span>${el.text}</span>
        <div>
          <button type="button" class="edit-post-btn" id="edit-post-btn" style="padding: 1px;">📝</button>
          <button type="button" class="comments-btn" id="comments-btn" style="padding: 1px;">📄</button>
        </div>
      `;

      // const textSpan = document.createElement('span');
      // textSpan.textContent = `${el.text}`;
      // liPost.append(textSpan);

      // const btns = document.createElement('div');
      // // btns.style.marginLeft = '20px';
      // btns.innerHTML = `
      //   <button type="button" class="edit-post-btn" id="edit-post-btn" style="padding: 1px;">📝</button>
      //   <button type="button" class="comments-btn" id="comments-btn" style="padding: 1px;">📄</button>
      // `;
      // // <button type="button" class="delete-post-btn" id="delete-post-btn" style="padding: 0px;">🗑</button>
      // liPost.append(btns);

      ulElem!.append(liPost);
    });
  }
}
