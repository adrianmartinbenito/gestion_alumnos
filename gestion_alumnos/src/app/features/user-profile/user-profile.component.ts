import { PostalCodeValidator } from './../validators/PostalCodeValidator';
import { DniValidator } from './../validators/dni.validator';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserListService } from '../services/user-list.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm : FormGroup;
  newUser!: User;

  constructor(public form:FormBuilder, private userListService: UserListService,) {
    this.newUser = this.userListService.getUserProfile();
    this.userForm = this.form.group({
      name: new FormControl(this.newUser.name,[
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
      ]),
      lastName1: new FormControl(this.newUser.lastname1,[
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
      ]),
      lastName2: new FormControl(this.newUser.lastname2,[
        Validators.maxLength(15),
        Validators.minLength(2),
      ]),
      email: new FormControl(this.newUser.email,[
        Validators.required,
        Validators.email
      ]),
      dni: new FormControl(this.newUser.dni,[
        Validators.required,
        DniValidator.isValidDni(),
      ]),
      phone: new FormControl(this.newUser.phone,[
        Validators.required,
        Validators.pattern('[- +()0-9]+'),
      ]),
      anotherPhone: new FormControl(this.newUser.anotherPhone,[
        Validators.pattern('[- +()0-9]+'),
      ]),
      province: new FormControl(this.newUser.province,[
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
      ]),
      postalCode: new FormControl(this.newUser.postalCode.toString(),[
        Validators.required,
        PostalCodeValidator.validatePostalCode(),
      ]),
      location: new FormControl(this.newUser.locality,[
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
      ]),
      nickname: new FormControl(this.newUser.nickname,[
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
      ]),
    })
  }
  getErrorMessage() {
    if (!this.userForm.valid) {
      return 'Revise los campos del formulario';
    }
    return;
  }

  ngOnInit(): void {
  }
  modifyProfile(){
    let isValidUser = this.userListService.isValidUser(this.userForm.get("nickname")?.value,this.userForm.get("dni")?.value);
    let changesToDniNickname = (this.userForm.get("nickname")?.value !== this.newUser.nickname || this.userForm.get("dni")?.value !== this.newUser.dni);
    if(!isValidUser && changesToDniNickname){
      alert("El dni o el nombre de usuario ya existe");
      return;

    }
    let userModified = new User(
      this.userForm.get('name')?.value,
      this.userForm.get('lastName1')?.value,
      this.userForm.get('lastName2')?.value,
      this.userForm.get('email')?.value,
      this.userForm.get('dni')?.value,
      this.userForm.get('phone')?.value,
      this.userForm.get('anotherPhone')?.value,
      this.userForm.get('country')?.value,
      this.userForm.get('province')?.value,
      this.userForm.get('postalCode')?.value,
      this.userForm.get('locality')?.value,
      this.userForm.get('nickname')?.value,
    )
    this.userListService.modifyProfile(this.newUser, userModified);
    this.newUser = userModified;
    alert("El usuario ha sido modificado");
  }

}
