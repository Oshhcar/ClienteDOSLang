import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  inicio = true;
  toggled2: boolean;

  sidebarCollapse2(): void {
    if (this.toggled2) {
      let element = document.getElementById('wrapper');
      element.className = '';
      let clase = document.body.className.replace(" sidebar2", "");
      document.body.className = clase.toString();
      this.toggled2 = false;
    } else {
      let element = document.getElementById('wrapper');
      element.className = 'toggled2';
      let clase = document.body.className.concat(" sidebar2");
      document.body.className = clase.toString();
      this.toggled2 = true;
    }

  }
}
