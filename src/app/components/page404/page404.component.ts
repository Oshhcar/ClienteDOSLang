import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router) {
    document.body.className = "bg-dark";
  }

  ngOnInit() {
    this.titleService.setTitle("404 Error - DOSLang");
  }

}
