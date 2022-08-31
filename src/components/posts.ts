import { urlPosts } from '../helpers/urls.js';
import { PostList } from '../models/post.js';
import { Fetch } from '../services/httpService.js';

export class OpenPosts {
  contentEl: HTMLDivElement;

  constructor() {
    this.contentEl = document.getElementById('content')! as HTMLDivElement;
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

// Functionality for post adding
class AddPost {
  addPostText: HTMLTextAreaElement;

  constructor() {
    this.addPostText = document.getElementById('addpost')! as HTMLTextAreaElement;
    this.configure();
  }

  private gatherUserInput() {
    const userInputPost = this.addPostText.value;
    // console.log(userInputPost);
    return userInputPost;
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    // Add new post to server and update a list of posts
    Fetch.POST(urlPosts, { text: this.gatherUserInput() }).then(() => new ShowPosts(false));
    this.clearInput();
  }

  private clearInput() {
    this.addPostText.value = '';
  }

  // Event listener
  private configure() {
    const addPostBtn = document.getElementById('addpostform')! as HTMLFormElement;
    addPostBtn.addEventListener('submit', this.submitHandler.bind(this));
  }
}

class ShowPosts {
  // posts: string[];
  posts: PostList;
  contentEl: HTMLDivElement;

  constructor(public firstRender: boolean = true) {
    this.contentEl = document.getElementById('content')! as HTMLDivElement;
    this.posts = { list: [] };
    this.fetchPosts();
  }

  private async fetchPosts() {
    return await Fetch.GET(urlPosts).then((data) => {
      // console.log(data);

      const list = [];
      for (let key in data) {
        list.push({
          id: key,
          text: data[key].text,
        });
      }
      this.posts.list = list;
      console.log(this.posts);

      this.append(this.firstRender);
    });
  }

  private append(firstTimeRender: boolean) {
    // 'firstTimeRender' - Create a new list on empty page 1st time or to update existing list after adding a post?
    if (firstTimeRender === true) {
      // Appending ul
      const ulEl = document.createElement('div');
      ulEl.innerHTML = `
        <ul id="postlist">
        </ul>
      `;
      this.contentEl.insertAdjacentElement('beforeend', ulEl);

      // Appending all li
      const ulElem = document.getElementById('postlist');
      this.posts.list.forEach((el) => {
        const liPost = document.createElement('li');
        liPost.textContent = `${el.text}`;
        ulElem!.append(liPost);
      });
    } else {
      const ulElem = document.getElementById('postlist');
      ulElem!.innerHTML = '';

      // Appending all li
      this.posts.list.forEach((el) => {
        const liPost = document.createElement('li');
        liPost.textContent = `${el.text}`;
        ulElem!.append(liPost);
      });
    }
  }
}
