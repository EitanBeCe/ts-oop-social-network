import { urlAcc, urlAccPut } from '../../helpers/urls.js';
import { UsersCodable } from '../../models/registerUser.js';
import { Fetch } from '../../services/httpService.js';
import { OpenPosts } from '../Posts/OpenPosts.js';

export class ChangePass {
  nameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  btnChangePass: HTMLButtonElement;
  users: UsersCodable;

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
