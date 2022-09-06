export class OpenComments {
  constructor(public postId: string, public postText: string, public userId: string) {
    new OpenAddCommentScreen(postText);

    // new AddPost(userId);
    // new ShowPosts();
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
				<label for="addcomment">Add comment to post: "${postText.slice(0, 10)}..."</label>
				<textarea type="text" id="addcomment"></textarea>
				<button>Add</button>
			</form>
		`;
  }
}
