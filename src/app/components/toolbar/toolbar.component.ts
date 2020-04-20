import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  loggedIn = false;
  user = 'Matti';

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    this.loggedIn = !this.loggedIn;
  }

}
