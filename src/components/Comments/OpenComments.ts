export class OpenComments {
  constructor(public postId: string, public postText: string) {
    new OpenAddCommentScreen(postText);

    // new AddPost(userId);
    // new ShowPosts();
  }
}

class OpenAddCommentScreen {
  contentEl: HTMLDivElement;
  constructor(public postText: string) {
    this.contentEl = document.getElementById('comments')! as HTMLDivElement;
    this.append(postText);
  }

  private append(postText: string) {
    this.contentEl.innerHTML = `
			<p>Post: ${postText.slice(0, 10)}...</p>
			<form action="submit" id="addcommentform">
				<label for="addcomment">Add comment to post ...</label>
				<textarea type="text" id="addcomment"></textarea>
				<button>Add</button>
			</form>
		`;
  }
}
