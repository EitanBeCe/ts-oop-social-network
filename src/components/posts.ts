import { urlPosts } from '../helpers/urls.js';
import { PostList } from '../models/post.js';
import { fetchGET, fetchPOST } from '../services/httpService.js';

export class OpenPosts {
  contentEl: HTMLDivElement;

  //(public data: Promise<string>)
  constructor() {
    this.contentEl = document.getElementById('content')! as HTMLDivElement;
    // new AddPost();
    new OpenAddPost();
    new AddPost();
    new ShowPosts();
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
    fetchPOST(urlPosts, { text: this.gatherUserInput() });
  }

  private gatherUserInput() {
    const userInputPost = this.addPostText.value;
    console.log(userInputPost);
    return userInputPost;
  }

  configure() {
    const addPostBtn = document.getElementById('addpostform')! as HTMLFormElement;
    addPostBtn.addEventListener('submit', this.submitHandler.bind(this));
  }
}

class ShowPosts {
  // posts: string[];
  posts: PostList;
  contentEl: HTMLDivElement;

  constructor() {
    this.contentEl = document.getElementById('content')! as HTMLDivElement;
    this.posts = { list: [] };
    this.fetchPosts();
    this.append();
  }

  private async fetchPosts() {
    return await fetchGET(urlPosts).then((data) => {
      console.log(data);

      this.posts.list.push({ text: data });
      console.log(this.posts);

      // return this.posts.list.push({ text: JSON.stringify(data) });
    });
  }

  append() {
    const ulEl = document.createElement('div');
    ulEl.innerHTML = `
      <ul id="postlist">
        <li id="post">DUmmy POst</li>
      </ul>
    `;
    this.contentEl.insertAdjacentElement('beforeend', ulEl);
  }
}
