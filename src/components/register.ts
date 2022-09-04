import { urlAcc, urlAccPut } from '../helpers/urls.js';
import { UserList } from '../models/registerUser.js';
import { Fetch } from '../services/httpService.js';
import { OpenPosts } from './posts.js';

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

export class Login {
  nameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  btnLogin: HTMLButtonElement;
  users: UserList;

  constructor() {
    this.nameInput = document.getElementById('name')! as HTMLInputElement;
    this.passwordInput = document.getElementById('password')! as HTMLInputElement;
    this.btnLogin = document.getElementById('login')! as HTMLButtonElement;
    this.users = { list: [] };

    this.listener();
  }

  private listener() {
    this.btnLogin.addEventListener('click', this.submitHandler.bind(this));
  }

  private submitHandler(event: Event) {
    event.preventDefault();

    Fetch.GET(urlAcc)
      .then((data) => {
        const list = [];
        for (let key in data) {
          list.push({
            id: key,
            name: data[key].name,
            password: data[key].password,
          });
        }
        this.users.list = list;
        // console.log(this.users.list);

        const usersList = this.users.list;
        console.log(usersList);

        // Name and pass from input exist on server?
        const filteredUser = usersList.filter(
          (user) => user.name === this.nameInput.value && user.password === this.passwordInput.value
        );

        const user = filteredUser[0];
        if (user === undefined) {
          throw new Error('Check your name and pass');
        }
        console.log(user.id);
        // console.log(typeof user.id);

        new OpenPosts(user.id!);
      })
      .catch((e) => console.error(e));
  }
}

export class ChangePass {
  nameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  btnChangePass: HTMLButtonElement;
  users: UserList;

  constructor() {
    this.nameInput = document.getElementById('name')! as HTMLInputElement;
    this.passwordInput = document.getElementById('password')! as HTMLInputElement;
    this.btnChangePass = document.getElementById('changepass')! as HTMLButtonElement;
    this.users = { list: [] };

    this.listener();
  }

  private listener() {
    this.btnChangePass.addEventListener('click', this.submitHandler.bind(this)); // 'submit'
  }

  private submitHandler(event: Event) {
    event.preventDefault();

    Fetch.GET(urlAcc)
      .then((data) => {
        const list = [];
        for (let key in data) {
          list.push({
            id: key,
            name: data[key].name,
            password: data[key].password,
          });
        }
        this.users.list = list;
        // console.log(this.users.list);

        const usersList = this.users.list;
        console.log(usersList);

        const filteredUser = usersList.filter((user) => user.name === this.nameInput.value);

        const user = filteredUser[0];
        if (user === undefined) {
          throw new Error('Check your name');
        }
        // console.log(user);
        // console.log(user.id);
        Fetch.PUT(urlAccPut(user.id!), { name: user.name, password: this.passwordInput.value });

        return user.id;
      })
      .then((userId) => new OpenPosts(userId!))
      .catch((e) => console.error(e));
  }
}
