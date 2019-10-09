import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggled: boolean;

  sidebarCollapse(): void {
    if (this.toggled) {
      let element = document.getElementById('wrapper');
      let elementClase = element.className.replace(" toggled", "");
      element.className = elementClase.toString();
      let clase = document.body.className.replace(" navbar2", "");
      document.body.className = clase.toString();
      this.toggled = false;
    } else {
      let element = document.getElementById('wrapper');
      let elementClase = element.className.concat(" toggled");
      element.className = elementClase.toString();
      let clase = document.body.className.concat(" navbar2");
      document.body.className = clase.toString();
      this.toggled = true;
    }

  }
}
