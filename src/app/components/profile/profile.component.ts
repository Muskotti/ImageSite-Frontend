import { Component, OnInit } from '@angular/core';
// import { GlobalConstants } from '../../global-constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: 'Jaska';

  constructor() { }

  ngOnInit(): void {
  }

  // ToDo: get profile from backend

}
