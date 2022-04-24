
import { PostalCodeValidator } from './../validators/PostalCodeValidator';
import { DniValidator } from './../validators/dni.validator';
import { UserListService } from './../services/user-list.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm : FormGroup;
  newUser!: User;
  selected='Esada';
  hide = true;

  constructor(public form:FormBuilder, private userListService: UserListService) {
    this.userForm = this.form.group({
      name: new FormControl('',[
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
      ]),
      lastName1: new FormControl('',[
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
      ]),
      lastName2: new FormControl('',[
        Validators.maxLength(15),
        Validators.minLength(2),
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      dni: new FormControl('',[
        Validators.required,
        DniValidator.isValidDni(),
      ]),
      phone: new FormControl('',[
        Validators.required,
        Validators.pattern('[- +()0-9]+'),
      ]),
      anotherPhone: new FormControl('',[
        Validators.pattern('[- +()0-9]+'),
      ]),
      province: new FormControl('',[
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
      ]),
      postalCode: new FormControl('',[
        Validators.required,
        PostalCodeValidator.validatePostalCode(),
      ]),
      pass: new FormControl('',[
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5),
      ]),
      pass2: new FormControl('',[
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5),

      ]),
    })
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (!this.userForm.valid) {
      return 'Error with format';
    }
    return;
  }
  get passwordInput() { return this.userForm.get('pass')?.value; }
  get passwordInput2() { return this.userForm.get('pass2')?.value; }

  addUser(){
    if(this.userForm.invalid || this.userForm.get("pass")?.value != this.userForm.get("pass2")?.value){
      if(this.userForm.get("pass")?.value === this.userForm.get("pass2")?.value){
        alert('Compruebe los campos resaltados');
        return;
      }
      alert('Las contraseñas no coinciden');
      return;

    }else{
      this.newUser = new User(
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


    }
    this.userListService.addUser(this.newUser)
    localStorage.setItem('Alumnos',JSON.stringify(this.userListService.getUsers()));
    alert ("Añadido");
  }

}
