import { urlPosts } from '../helpers/urls.js';
import { fetchPost } from '../services/httpService.js';

export class OpenPosts {
  contentEl: HTMLDivElement;

  //(public data: Promise<string>)
  constructor() {
    this.contentEl = document.getElementById('content')! as HTMLDivElement;
    // new AddPost();
    new OpenAddPost();
    new AddPost();
  }
}

class OpenAddPost {
  contentEl: HTMLDivElement;
  constructor() {
    this.contentEl = document.getElementById('content')! as HTMLDivElement;
    this.append();
  }

  append() {
    // const addEl = document.createElement('div');
    // addEl.id = 'add_post';
    this.contentEl.innerHTML = `
			<form action="submit" id="addpostform">
				<label for="addpost">Add post</label>
				<textarea type="text" id="addpost"></textarea>
				<button>Add</button>
			</form>
		`;
    // this.contentEl.insertAdjacentElement('beforeend', addEl);
  }
}

class AddPost {
  addPostText: HTMLTextAreaElement;

  constructor() {
    this.addPostText = document.getElementById('addpost')! as HTMLTextAreaElement;
    // this.gatherUserInput();
    this.configure();
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    // console.log(this.nameInput.value);
    fetchPost(urlPosts, { text: this.gatherUserInput() });
  }

  private gatherUserInput() {
    const userInputPost = this.addPostText.value;
    console.log(userInputPost);
    return userInputPost;
  }

  configure() {
    const addPostBtn = document.getElementById('addpostform')! as HTMLFormElement;
    addPostBtn.addEventListener('submit', this.submitHandler);
  }
}
