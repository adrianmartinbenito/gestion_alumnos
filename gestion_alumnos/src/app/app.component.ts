import { MatDrawer } from '@angular/material/sidenav';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  title = 'gestion_alumnos';

  open_sidebar(){
    this.drawer?.toggle();
  }

}
