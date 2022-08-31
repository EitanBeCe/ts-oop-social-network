// import { urlAcc } from '../helpers/urls.js';
// import { Fetch } from '../services/httpService.js';
import { OpenPosts } from './posts.js';

export class Registration {
  nameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  form: HTMLFormElement;

  constructor() {
    this.nameInput = document.getElementById('name')! as HTMLInputElement;
    this.passwordInput = document.getElementById('password')! as HTMLInputElement;
    this.form = document.getElementById('form')! as HTMLFormElement;
    this.login();
  }

  login() {
    this.form.addEventListener('submit', this.submitHandler.bind(this));
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    // SWITCH IT ON LATER!!
    // Fetch.POST(urlAcc, { name: this.nameInput.value, password: this.passwordInput.value });
    new OpenPosts();
  }
}
