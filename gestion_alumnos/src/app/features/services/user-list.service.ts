import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private _users:User[];
  constructor() {
    this._users = JSON.parse(localStorage.getItem('Alumnos')!!)
  }

  getUsers(): User[]{
    return this._users;
  }
  addUser(user:User){
    this._users.push(user);
  }
  delete_user(user:User){
    this._users.splice(this._users.indexOf(user),1);
    localStorage.setItem('Alumnos',JSON.stringify(this._users));
    return this._users;
  }
}
