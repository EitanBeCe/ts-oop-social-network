import { urlAcc, urlAccPut } from '../../helpers/urls.js';
import {
  AccountCodable,
  AccountCodableServerFormat,
  AccountsCodable,
} from '../../models/account.js';
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
        const accountsData = data.data;
        if (accountsData) {
          for (let key in accountsData) {
            list.push({
              id: key,
              name: accountsData[key as keyof AccountCodableServerFormat].name,
              password: accountsData[key as keyof AccountCodableServerFormat].password,
            });
          }
        } else {
          throw new Error('Could not GET accounts info');
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
        Fetch.PUT<AccountCodable>(urlAccPut(user.id!), {
          name: user.name,
          password: this.passwordInput.value,
        }).then(() => {
          new OpenPosts(user.id!);
        });
      })
      .catch((e) => console.error(e));
  }
}
