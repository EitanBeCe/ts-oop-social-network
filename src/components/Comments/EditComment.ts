import { urlCommentsPutOrDel } from '../../helpers/urls.js';
import { CommentCodable, CommentsCodable } from '../../models/comment.js';
import { Fetch } from '../../services/httpService.js';
import { OpenComments } from '../Comments/OpenComments.js';

export class EditComment {
  appDiv: HTMLDivElement;
  ulComments: HTMLUListElement;
  constructor(
    private commentsArr: CommentsCodable,
    private userId: string,
    private postId: string,
    private postText: string
  ) {
    this.appDiv = document.getElementById('app')! as HTMLDivElement;
    this.ulComments = document.getElementById('commentlist')! as HTMLUListElement;
    this.configure();
  }

  // Listeners to all comments. To open Edit Window, Enter Comments and Delete comment
  configure() {
    const liCommentArr = this.ulComments.querySelectorAll('li')! as NodeListOf<HTMLLIElement>;

    for (const li of liCommentArr) {
      // Open Edit Window
      li.getElementsByTagName('button')[0].addEventListener(
        'click',
        this.enterEditModeHandler.bind(this, li),
        { once: true }
      );

      // Delete Comment
      li.getElementsByTagName('button')[1].addEventListener(
        'click',
        this.delCommentHandler.bind(this, li),
        { once: true }
      );
    }
  }

  private delCommentHandler(li: HTMLLIElement) {
    const commentId = li.id;

    Fetch.DEL<CommentCodable>(urlCommentsPutOrDel(this.postId, commentId))
      .then((data) => {
        if (data.status >= 200 && data.status < 300) {
          this.appDiv.innerHTML = '';
          new OpenComments(this.userId, this.postId, this.postText);
        } else {
          new OpenComments(this.userId, this.postId, this.postText);
          throw new Error('Deleting problems');
        }
      })
      .catch((e) => {
        console.error(e);
        alert(e);
      });

    this.appDiv.innerHTML = `
      Deleting comment...
    `;
  }

  private enterEditModeHandler(li: HTMLLIElement) {
    // console.log(li.firstChild);
    const textSpan = li.getElementsByTagName('span')[0] as HTMLSpanElement;
    const commentText = textSpan.innerText;

    this.appDiv.innerHTML = `
    <ul style="list-style-type: none">
      <li id="${li.id}" style="margin-bottom: 15px;">
        <form action="submit" id="editcommentform">
          <label for="editcomment">Edit comment</label>
          <textarea type="text" id="editcomment">${commentText}</textarea>
          <button type="submit">Edit</button>
          <button type="button" id="editcomment-back-btn">Back</button>
        </form>
      </li>
    </ul>
    `;

    this.configureEditComment(li);
  }

  private configureEditComment(li: HTMLLIElement) {
    const editForm = document.getElementById('editcommentform')! as HTMLFormElement;
    const backBtn = document.getElementById('editcomment-back-btn')! as HTMLButtonElement;

    editForm.addEventListener('submit', this.editCommentConfirm.bind(this, li));
    backBtn.addEventListener('click', this.goBackHandler.bind(this));
  }

  goBackHandler() {
    new OpenComments(this.userId, this.postId, this.postText);
  }

  private editCommentConfirm(li: HTMLLIElement, e: Event) {
    e.preventDefault();
    // console.log(li);
    const commentId = li.id;

    const filteredComment = this.commentsArr.list.filter((comment) => comment.id === commentId);
    const comment = filteredComment[0];
    // console.log(comment);

    const editInput = document.getElementById('editcomment')! as HTMLTextAreaElement;
    // console.log(commentId);
    // console.log(this.commentsArr);
    // console.log(editInput.value);

    Fetch.PUT<CommentCodable>(urlCommentsPutOrDel(this.postId, commentId), {
      created_at: comment.created_at,
      ownerId: comment.ownerId,
      text: editInput.value,
      updated_at: new Date(),
      module: 'posts',
      module_id: this.postId,
    })
      .then((data) => {
        if (data.data) {
          this.appDiv.innerHTML = '';
          new OpenComments(this.userId, this.postId, this.postText);
        } else {
          throw new Error('No fetched comment text');
        }
      })
      .catch((err) => console.error(err));

    this.appDiv.innerHTML = `
      Changing comment...
    `;
  }
}
