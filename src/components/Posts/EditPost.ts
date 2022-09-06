import { urlPostsPut } from '../../helpers/urls.js';
import { PostCodable, PostsCodable } from '../../models/post.js';
import { Fetch } from '../../services/httpService.js';
import { OpenComments } from '../Comments/OpenComments.js';
import { OpenPosts } from '../Posts/OpenPosts.js';

export class EditPost {
  appDiv: HTMLDivElement;
  ulPosts: HTMLUListElement;
  constructor(public postsArr: PostsCodable) {
    this.appDiv = document.getElementById('app')! as HTMLDivElement;
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
    // console.log(li.firstChild);
    const textSpan = li.getElementsByTagName('span')[0] as HTMLSpanElement;
    const postText = textSpan.innerText;

    this.appDiv.innerHTML = `
    <ul style="list-style-type: none">
      <li id="${li.id}" style="margin-bottom: 15px;">
        <form action="submit" id="editpostform">
          <label for="editpost">Edit post</label>
          <textarea type="text" id="editpost">${postText}</textarea>
          <button>Edit</button>
        </form>
      </li>
    </ul>
    `;

    this.configureEditPost(li);

    // new OpenComments(li.id, postText);
  }

  private configureEditPost(li: HTMLLIElement) {
    const editForm = document.getElementById('editpostform')! as HTMLFormElement;

    editForm.addEventListener('submit', this.editPostConfirm.bind(this, li));
  }

  private editPostConfirm(li: HTMLLIElement, e: Event) {
    e.preventDefault();
    // console.log(li);
    const postId = li.id;

    const filteredPost = this.postsArr.list.filter((post) => post.id === postId);
    const post = filteredPost[0];
    // console.log(post);

    const editInput = document.getElementById('editpost')! as HTMLTextAreaElement;
    // console.log(postId);
    // console.log(this.postsArr);
    // console.log(editInput.value);

    Fetch.PUT<PostCodable>(urlPostsPut(postId), {
      created_at: post.created_at,
      ownerId: post.ownerId,
      text: editInput.value,
      updated_at: new Date(),
    }).then((data) => {
      // const ShowPost = new ShowPosts();
      // const textSpan = li.firstChild! as HTMLSpanElement; // HERE
      if (data.data) {
        this.appDiv.innerHTML = '';
        new OpenPosts(post.ownerId);
        // ShowPost.liAppender(true);
        // li.innerHTML = data.data.text;
      } else {
        throw new Error('No fetched post text');
      }
    });
    //   .then(() =>
    //     li.addEventListener('click', this.enterEditModeHandler.bind(this, li), { once: true })
    //   )
    //   .catch((e) => console.error(e));

    this.appDiv.innerHTML = `
      Changing post...
    `;
  }
}
