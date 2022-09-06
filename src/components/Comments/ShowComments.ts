import { urlComments } from '../../helpers/urls.js';
import { CommentsCodable, CommentsCodableServerFormat } from '../../models/comment.js';
import { Fetch } from '../../services/httpService.js';
// import { EditComment } from './EditComment.js';

export class ShowComments {
  comments: CommentsCodable;
  contentEl: HTMLDivElement;

  constructor(public userId: string, public postId: string) {
    this.contentEl = document.getElementById('app')! as HTMLDivElement;
    this.comments = { list: [] };
    this.fetchComments();
  }

  private async fetchComments() {
    return await Fetch.GET<CommentsCodableServerFormat>(urlComments(this.postId)).then((data) => {
      const list = [];
      const commentsData = data.data;

      if (commentsData) {
        for (let key in commentsData) {
          list.push({
            id: key,
            text: commentsData[key as keyof CommentsCodableServerFormat].text,
            ownerId: commentsData[key as keyof CommentsCodableServerFormat].ownerId,
            created_at: commentsData[key as keyof CommentsCodableServerFormat].created_at,
            updated_at: commentsData[key as keyof CommentsCodableServerFormat].updated_at,
            module: 'posts',
            module_id: this.postId,
          });
        }
      } else {
        // error
      }

      this.comments.list = list;
      console.log('CommentsList:', this.comments);

      this.append();

      return this.comments;
    });
    //   .then((commentsArr) => new EditComment(commentsArr, this.userId));
  }

  private append() {
    // 'firstTimeRender' - Create a new list when entering or update existing list after adding a comment

    // if (firstTimeRender === true) {

    // Appending ul
    const ulEl = document.createElement('div');
    ulEl.innerHTML = `
          <ul id="commentlist">
          </ul>
        `;
    this.contentEl.insertAdjacentElement('beforeend', ulEl);

    this.liAppender();
    // } else {
    //   this.liAppender();
    // }
  }

  public liAppender() {
    const ulElem = document.getElementById('commentlist');
    // !firstTimeRender ? (ulElem!.innerHTML = '') : null;

    this.comments.list.forEach((el) => {
      const liComment = document.createElement('li');
      liComment.id = el.id!;
      liComment.style.marginBottom = '15px';
      liComment.innerHTML = `
        <span>${el.text}</span>
        <div>
          <button type="button" class="edit-comment-btn" id="edit-comment-btn" style="padding: 1px;">📝</button>
          <button type="button" class="delete-comment-btn" id="comments-btn" style="padding: 1px;">🗑</button>
        </div>
      `;

      // const textSpan = document.createElement('span');
      // textSpan.textContent = `${el.text}`;
      // liComment.append(textSpan);

      // const btns = document.createElement('div');
      // // btns.style.marginLeft = '20px';
      // btns.innerHTML = `
      //   <button type="button" class="edit-comment-btn" id="edit-comment-btn" style="padding: 1px;">📝</button>
      //   <button type="button" class="comments-btn" id="comments-btn" style="padding: 1px;">📄</button>
      // `;
      // // <button type="button" class="delete-comment-btn" id="delete-comment-btn" style="padding: 0px;">🗑</button>
      // liComment.append(btns);

      ulElem!.append(liComment);
    });
  }
}
