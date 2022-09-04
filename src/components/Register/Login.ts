import { urlAcc } from '../../helpers/urls.js';
import { UsersCodable } from '../../models/registerUser.js';
import { Fetch } from '../../services/httpService.js';
import { OpenPosts } from '../Posts/OpenPosts.js';

export class Login {
  nameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  btnLogin: HTMLButtonElement;
  users: UsersCodable;

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
        console.log('UsersList:', usersList);

        // Name and pass from input exist on server?
        const filteredUser = usersList.filter(
          (user) => user.name === this.nameInput.value && user.password === this.passwordInput.value
        );

        const user = filteredUser[0];
        if (user === undefined) {
          throw new Error('Check your name and pass');
        }
        console.log('UserId:', user.id);
        // console.log(typeof user.id);

        new OpenPosts(user.id!);
      })
      .catch((e) => console.error(e));
  }
}
