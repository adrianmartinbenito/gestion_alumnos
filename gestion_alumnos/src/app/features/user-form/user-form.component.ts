import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm : FormGroup;

  constructor(public form:FormBuilder) {
    this.userForm = this.form.group({
      name: new FormControl('',[
        Validators.required
      ]),
/*       lastName1: new FormControl(''),
      lastName2: new FormControl(''),
      email: new FormControl(''),
      dni: new FormControl(''),
      phone: new FormControl(''),
      anotherPhone: new FormControl(''),
      country: new FormControl(''),
      province: new FormControl(''),
      postalCode: new FormControl(''),
      locality: new FormControl(''),
      nickname: new FormControl(''), */
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

}
