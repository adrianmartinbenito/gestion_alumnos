import { UserListService } from './../services/user-list.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  _users:User[];
  dataSource :MatTableDataSource<User>
  displayedColumns: string[] = ['nickname','name', 'lastName1', 'lastName2','dni','country','postalCode', 'email','buttons'];
  constructor(private listService: UserListService, private router : Router) {
    this._users = listService.getUsers();
    this.dataSource = new MatTableDataSource<User>(this._users);
  }

  ngOnInit(): void {
  }

  delete_user(user:User){

    this._users = this.listService.delete_user(user);
    this.dataSource = new MatTableDataSource<User>(this._users);

  }
  router_to_profile(user:User){
    this.listService.setUserProfile(user);
    this.router.navigate(["/profile"]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
