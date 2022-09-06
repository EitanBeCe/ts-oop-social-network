import { AddComment } from './AddComment.js';
import { ShowComments } from './ShowComments.js';

export class OpenComments {
  constructor(
    public userId: string,
    public postId: string,
    public postText: string,
    firstRender: boolean = true
  ) {
    new OpenAddCommentScreen(postText);

    new AddComment(userId, postId, postText);
    new ShowComments(firstRender, userId, postId, postText);
  }
}

class OpenAddCommentScreen {
  contentEl: HTMLDivElement;
  constructor(public postText: string) {
    this.contentEl = document.getElementById('app')! as HTMLDivElement;
    this.append(postText);
  }

  private append(postText: string) {
    this.contentEl.innerHTML = `
			<form action="submit" id="addcommentform">
				<label for="addcomment">Add comment to post: "${postText.slice(0, 6)}..."</label>
				<textarea type="text" id="addcomment"></textarea>
				<button>Add</button>
			</form>
		`;
  }
}
