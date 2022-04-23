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
    })
  }
  getErrorMessage() {
    if (!this.userForm.valid) {
      return 'Error with format';
    }
    return;
  }

  ngOnInit(): void {
  }

}
