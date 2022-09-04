import { urlAcc } from '../../helpers/urls.js';
import { Fetch } from '../../services/httpService.js';
import { OpenPosts } from '../Posts/OpenPosts.js';

export class Signup {
  nameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  btnSignup: HTMLButtonElement;

  constructor() {
    this.nameInput = document.getElementById('name')! as HTMLInputElement;
    this.passwordInput = document.getElementById('password')! as HTMLInputElement;
    this.btnSignup = document.getElementById('signup')! as HTMLButtonElement;
    this.listener();
  }

  listener() {
    this.btnSignup.addEventListener('click', this.submitHandler.bind(this));
  }

  private submitHandler(event: Event) {
    event.preventDefault();

    Fetch.POST(urlAcc, { name: this.nameInput.value, password: this.passwordInput.value }).then(
      (userId) => new OpenPosts(userId)
    );
    // new OpenPosts();
  }
}
