import { AddPost } from './AddPost.js';
import { ShowPosts } from './ShowPosts.js';

export class OpenPosts {
  constructor(userId: string, firstRender: boolean = true) {
    new OpenAddPostScreen();

    new AddPost(userId);
    new ShowPosts(firstRender, userId);
  }
}

export class OpenAddPostScreen {
  contentEl: HTMLDivElement;
  constructor() {
    this.contentEl = document.getElementById('app')! as HTMLDivElement;
    this.append();
  }

  private append() {
    this.contentEl.innerHTML = `
			<form action="submit" id="addpostform" style="width: 220px;>
				<label for="addpost">Add post</label>
				<textarea type="text" id="addpost"></textarea>
				<button>Add</button>
			</form>
		`;
  }
}
