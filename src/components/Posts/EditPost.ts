import { urlPosts, urlPostsPutOrDel } from '../../helpers/urls.js';
import { PostCodable, PostsCodable } from '../../models/post.js';
import { Fetch } from '../../services/httpService.js';
import { OpenComments } from '../Comments/OpenComments.js';
import { OpenPosts } from '../Posts/OpenPosts.js';

export class EditPost {
  appDiv: HTMLDivElement;
  ulPosts: HTMLUListElement;
  constructor(public postsArr: PostsCodable, public userId: string) {
    this.appDiv = document.getElementById('app')! as HTMLDivElement;
    this.ulPosts = document.getElementById('postlist')! as HTMLUListElement;
    this.configure();
  }

  // Listeners to all posts. To open Edit Window, Enter Comments and Delete post
  configure() {
    const liPostArr = this.ulPosts.querySelectorAll('li')! as NodeListOf<HTMLLIElement>;

    for (const li of liPostArr) {
      // Open Edit Window
      li.getElementsByTagName('button')[0].addEventListener(
        'click',
        this.enterEditModeHandler.bind(this, li),
        { once: true }
      );

      // Enter Comments
      li.getElementsByTagName('button')[1].addEventListener(
        'click',
        this.enterCommentsHandler.bind(this, li),
        { once: true }
      );

      // Delete Post
      li.getElementsByTagName('button')[2].addEventListener(
        'click',
        this.delPostHandler.bind(this, li),
        { once: true }
      );
    }
  }

  private enterCommentsHandler(li: HTMLLIElement) {
    const textSpan = li.getElementsByTagName('span')[0] as HTMLSpanElement;
    const postText = textSpan.innerText;

    new OpenComments(li.id, postText, this.userId);
  }

  private delPostHandler(li: HTMLLIElement) {
    // console.log(li);
    const postId = li.id;

    const filteredPost = this.postsArr.list.filter((post) => post.id === postId);
    const post = filteredPost[0];
    // console.log(post);
    // console.log(postId);
    // console.log(this.postsArr);

    Fetch.DEL<PostCodable>(urlPostsPutOrDel(postId))
      .then((data) => {
        if (data.status >= 200 && data.status < 300) {
          this.appDiv.innerHTML = '';
          // new OpenPosts(post.ownerId);
          new OpenPosts(this.userId);
        } else {
          throw new Error('Deleting problems');
        }
      })
      .catch((e) => console.error(e));

    this.appDiv.innerHTML = `
      Deleting post...
    `;
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

    Fetch.PUT<PostCodable>(urlPostsPutOrDel(postId), {
      created_at: post.created_at,
      ownerId: post.ownerId,
      text: editInput.value,
      updated_at: new Date(),
    })
      .then((data) => {
        if (data.data) {
          this.appDiv.innerHTML = '';
          new OpenPosts(post.ownerId);
        } else {
          throw new Error('No fetched post text');
        }
      })
      //   .then(() =>
      //     li.addEventListener('click', this.enterEditModeHandler.bind(this, li), { once: true })
      //   )
      .catch((e) => console.error(e));

    this.appDiv.innerHTML = `
      Changing post...
    `;
  }
}
