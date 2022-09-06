import { urlPosts } from '../../helpers/urls.js';
import { Fetch } from '../../services/httpService.js';
import { ShowPosts } from './ShowPosts.js';

// Functionality for post adding
export class AddPost {
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
    return this.inputPostText.value;
  }

  private submitHandler(event: Event) {
    event.preventDefault();

    Fetch.POST(urlPosts, {
      text: this.gatherUserInput(),
      ownerId: this.userId,
      created_at: new Date(),
    }).then(() => new ShowPosts(false, this.userId)); // Add new post to server and update a list of posts
    this.clearInput();
  }

  private clearInput() {
    this.inputPostText.value = '';
  }
}
