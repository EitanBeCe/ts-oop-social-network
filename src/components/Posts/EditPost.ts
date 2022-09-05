import { urlPostsPut } from '../../helpers/urls.js';
import { PostCodable, PostsCodable } from '../../models/post.js';
import { Fetch } from '../../services/httpService.js';

export class EditPost {
  ulPosts: HTMLUListElement;
  constructor(public postsArr: PostsCodable) {
    this.ulPosts = document.getElementById('postlist')! as HTMLUListElement;
    this.configure();
  }

  // Listeners to all the posts
  configure() {
    const liPostArr = this.ulPosts.querySelectorAll('li')! as NodeListOf<HTMLLIElement>;

    for (const li of liPostArr) {
      li.addEventListener('click', this.enterEditModeHandler.bind(this, li), { once: true });
    }
  }

  private enterEditModeHandler(li: HTMLLIElement) {
    li.innerHTML = `
      <form action="submit" id="editpostform">
        <label for="editpost">Edit post</label>
        <textarea type="text" id="editpost">${li.innerText}</textarea>
        <button>Edit</button>
      </form>
    `;

    this.configureEditPost(li);
  }

  private configureEditPost(li: HTMLLIElement) {
    const editForm = document.getElementById('editpostform');

    editForm!.addEventListener('submit', this.editPost.bind(this, li));
  }

  private editPost(li: HTMLLIElement) {
    console.log(li);
    const postId = li.id;

    const filteredPost = this.postsArr.list.filter((post) => post.id === postId);
    const post = filteredPost[0];
    console.log(post);

    const editInput = document.getElementById('editpost')! as HTMLTextAreaElement;

    Fetch.PUT<PostCodable>(urlPostsPut(postId), {
      created_at: post.created_at,
      ownerId: post.ownerId,
      text: editInput.value,
      updated_at: new Date(),
    })
      .then((data) => {
        if (data.data) {
          li.innerHTML = data.data.text;
        } else {
          throw new Error('No fetched post text');
        }
      })
      .then(() =>
        li.addEventListener('click', this.enterEditModeHandler.bind(this, li), { once: true })
      )
      .catch((e) => console.error(e));

    li.innerHTML = `
      Changing post...
    `;
  }
}
