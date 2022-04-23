import { MatDrawer } from '@angular/material/sidenav';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('drawer') drawer!: MatDrawer;

  title = 'gestion_alumnos';

  ngOnInit(): void {
    this.initialize();
  }

  open_sidebar(){
    this.drawer?.toggle();
  }

  initialize(){
    localStorage.setItem('Alumnos',
      JSON.stringify([
      {
        name:"Adrian",
        lastname1:"Martin",
        lastname2:"Benito",
        email:"a@gmail.com",
        dni:"09111562C",
        phone:"613261760",
        anotherPhone:"613261760",
        country:"España",
        province:"Madrid",
        postalCode:28801,
        locality:"Alcala",
        nickname:"AaaAaa",

      },
      {
        name:"Raul",
        lastname1:"Pradanas",
        lastname2:"Martin",
        email:"p@gmail.com",
        dni:"09731262F",
        phone:"672261760",
        anotherPhone:"613251762",
        country:"España",
        province:"Madrid",
        postalCode:28802,
        locality:"Loeches",
        nickname:"pPPpp",

      },
      {
        name:"Alberto",
        lastname1:"Lopez",
        lastname2:"Sanchez",
        email:"s@gmail.com",
        dni:"09456562C",
        phone:"614561760",
        anotherPhone:"614561760",
        country:"España",
        province:"Madrid",
        postalCode:28807,
        locality:"Torrejon",
        nickname:"sssSSss",

      }
    ])
    )
  }

}
