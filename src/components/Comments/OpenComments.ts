import { AddComment } from './AddComment.js';
import { ShowComments } from './ShowComments.js';

export class OpenComments {
  constructor(userId: string, postId: string, postText: string, firstRender: boolean = true) {
    new OpenAddCommentScreen(postText);

    new AddComment(userId, postId, postText);
    new ShowComments(firstRender, userId, postId, postText);
  }
}

class OpenAddCommentScreen {
  contentEl: HTMLDivElement;
  constructor(postText: string) {
    this.contentEl = document.getElementById('app')! as HTMLDivElement;
    this.append(postText);
  }

  private append(postText: string) {
    this.contentEl.innerHTML = `
			<form action="submit" id="addcommentform" style="width: 220px;>
				<label for="addcomment">Add comment to post: "${postText.slice(0, 6)}..."</label>
				<textarea type="text" id="addcomment"></textarea>
				<button type="submit">Add</button>
        <button type="button" id="comment-back-btn">Back</button>
			</form>
		`;
  }
}
