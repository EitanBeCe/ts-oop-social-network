import { fetchPost } from '../services/httpService.js';
import { OpenPosts } from './posts.js';

const urlFirebase = 'https://nathan-test-c723c-default-rtdb.firebaseio.com/account.json'; //api/v1.0/account.json

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
    console.log(this.nameInput.value);
    fetchPost(urlFirebase, { name: this.nameInput.value, password: this.passwordInput.value });
    new OpenPosts();
  }
}
