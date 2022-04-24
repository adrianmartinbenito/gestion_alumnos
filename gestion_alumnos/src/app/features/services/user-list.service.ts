import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private _users:User[];
  private _userProfile!:User;
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

  setUserProfile(user:User){
    this._userProfile = user;
  }
  getUserProfile():User{
    return this._userProfile;
  }
  modifyProfile(user:User, newUser:User){
    this._users.splice(this._users.indexOf(user),1);
    this._users.push(newUser);
    localStorage.setItem('Alumnos',JSON.stringify(this._users));
  }
  isValidUser(nickname:string, dni:string):boolean{
    return !this._users.some(userElement =>
      (userElement.dni.toUpperCase() === dni.toUpperCase() || userElement.nickname === nickname)
    )
  }
}
