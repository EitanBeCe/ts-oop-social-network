import { AddPost } from './AddPost.js';
import { ShowPosts } from './ShowPosts.js';

export class OpenPosts {
  contentEl: HTMLDivElement;

  constructor(public userId: string) {
    this.contentEl = document.getElementById('app')! as HTMLDivElement;
    new OpenAddPostScreen();

    new AddPost(userId);
    new ShowPosts();
  }
}

class OpenAddPostScreen {
  contentEl: HTMLDivElement;
  constructor() {
    this.contentEl = document.getElementById('app')! as HTMLDivElement;
    this.append();
  }

  private append() {
    this.contentEl.innerHTML = `
			<form action="submit" id="addpostform">
				<label for="addpost">Add post</label>
				<textarea type="text" id="addpost"></textarea>
				<button>Add</button>
			</form>
		`;
  }
}
