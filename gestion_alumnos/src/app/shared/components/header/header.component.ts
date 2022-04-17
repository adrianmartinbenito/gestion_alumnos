import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onToggleMenu = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  open_sidenav(){
    this.onToggleMenu.emit();
  }
}
