import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private _users:User[];
  private _users$:Subject<User[]>;
  constructor() {
    this._users = JSON.parse(localStorage.getItem('Alumnos')!!)
    this._users$ = new Subject();
  }

  getUsers(): User[]{
    return this._users;
  }
  addUser(user:User){
    this._users.push(user);
    this._users$.next(this._users);
  }
}
