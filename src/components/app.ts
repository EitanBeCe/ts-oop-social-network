// import { fetchPost } from './services/httpService';
// import { registerUser } from './models/registerUser';

const urlFirebase = 'https://nathan-test-c723c-default-rtdb.firebaseio.com/account.json'; ///api/v1.0/account.json

const fetchPoste = async (url: string, body: {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
};

class Registration {
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
    console.log('Clicked');
    console.log(this.nameInput.value);
    fetchPoste(urlFirebase, { name: this.nameInput.value, password: this.passwordInput.value });
  }
}

const register = new Registration();
register;
