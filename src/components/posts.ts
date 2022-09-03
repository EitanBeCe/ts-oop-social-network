import { urlPosts } from '../helpers/urls.js';
import { PostList } from '../models/post.js';
import { Fetch } from '../services/httpService.js';

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

// Functionality for post adding
class AddPost {
  inputPostText: HTMLTextAreaElement;

  constructor(public userId: string) {
    this.inputPostText = document.getElementById('addpost')! as HTMLTextAreaElement;
    this.configure();
  }

  // Add Event listener
  private configure() {
    const addPostBtn = document.getElementById('addpostform')! as HTMLFormElement;
    addPostBtn.addEventListener('submit', this.submitHandler.bind(this));
  }

  private gatherUserInput() {
    // const userInputPost = ;
    // console.log(userInputPost);
    return this.inputPostText.value;
  }

  private submitHandler(event: Event) {
    event.preventDefault();

    Fetch.POST(urlPosts, {
      text: this.gatherUserInput(),
      owner: this.userId,
      created_at: new Date(),
    }).then(() => new ShowPosts(false)); // Add new post to server and update a list of posts
    this.clearInput();
  }

  private clearInput() {
    this.inputPostText.value = '';
  }
}

class ShowPosts {
  // posts: string[];
  posts: PostList;
  contentEl: HTMLDivElement;

  constructor(public firstRender: boolean = true) {
    this.contentEl = document.getElementById('app')! as HTMLDivElement;
    this.posts = { list: [] };
    this.fetchPosts();
  }

  private async fetchPosts() {
    return await Fetch.GET(urlPosts)
      .then((data) => {
        // console.log(data);

        const list = [];
        for (let key in data) {
          list.push({
            id: key,
            text: data[key].text,
            owner: data[key].owner,
            created_at: data[key].created_at,
          });
        }
        this.posts.list = list;
        console.log(this.posts);

        this.append(this.firstRender);
      })
      .then(() => new EditPost());
  }

  private append(firstTimeRender: boolean) {
    // 'firstTimeRender' - Create a new list when entering or update existing list after adding a post
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
        liPost.id = el.id!;
        liPost.textContent = `${el.text}`;
        ulElem!.append(liPost);
      });
    } else {
      const ulElem = document.getElementById('postlist');
      ulElem!.innerHTML = '';

      // Appending all li
      this.posts.list.forEach((el) => {
        const liPost = document.createElement('li');
        liPost.id = el.id!;
        liPost.textContent = `${el.text}`;
        ulElem!.append(liPost);
      });
    }
  }
}

class EditPost {
  ulPosts: HTMLUListElement;
  constructor() {
    this.ulPosts = document.getElementById('postlist')! as HTMLUListElement;
    this.configure();
  }

  // Listeners to all the posts
  configure() {
    const liPostArr = this.ulPosts.querySelectorAll('li')! as NodeListOf<HTMLLIElement>;

    for (const li of liPostArr) {
      li.addEventListener('click', this.enterEditModeHandler.bind(this, li), { once: true });
    }
  }

  enterEditModeHandler(li: HTMLLIElement) {
    // console.log(li);
    li.innerHTML = `
      <form action="submit" id="editpostform">
				<label for="editpost">Edit post</label>
				<textarea type="text" id="editpost">${li.innerText}</textarea>
				<button>Edit</button>
			</form>
    `;

    this.configureEditPost(li);
  }

  configureEditPost(li: HTMLLIElement) {
    const editForm = document.getElementById('editpostform');
    const editInput = document.getElementById('editpost')! as HTMLTextAreaElement;
    editForm!.addEventListener('submit', this.editPost.bind(this, li, editInput));
  }

  editPost(li: HTMLLIElement, editInput: HTMLTextAreaElement) {
    // PUT !!!
    // then (may be just GET it)
    console.log(li, editInput);

    li.innerHTML = `
      ${editInput}
    `;
  }
}
