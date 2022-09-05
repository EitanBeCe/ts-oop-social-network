import { urlAcc, urlAccPut } from '../../helpers/urls.js';
import { AccountCodableServerFormat, AccountsCodable } from '../../models/account.js';
import { Fetch } from '../../services/httpService.js';
import { OpenPosts } from '../Posts/OpenPosts.js';

export class ChangePass {
  nameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  btnChangePass: HTMLButtonElement;
  users: AccountsCodable;

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

    Fetch.GET<AccountCodableServerFormat>(urlAcc)
      .then((data) => {
        const list = [];
        const d = data.data;
        if (d) {
          for (let key in d) {
            list.push({
              id: key,
              name: d[key as keyof AccountCodableServerFormat].name,
              password: d[key as keyof AccountCodableServerFormat].password,
            });
          }
        } else {
          // ERROR
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
