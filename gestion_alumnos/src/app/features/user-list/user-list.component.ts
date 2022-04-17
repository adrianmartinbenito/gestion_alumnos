import { UserListService } from './../services/user-list.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  _users:User[];
  dataSource :MatTableDataSource<User>
  displayedColumns: string[] = ['name', 'lastName1', 'dni', 'email','buttons'];
  constructor(private listService: UserListService) {
    this._users = listService.getUsers();
    this.dataSource = new MatTableDataSource<User>(this._users);
  }

  ngOnInit(): void {
  }

}
