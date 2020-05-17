import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../../global-constants';
import { ActivatedRoute } from '@angular/router';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  username: string;
  password: string;

  isLogged = false;

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit(): void {
    const token = Cookies.get('login')

    if (token) {
      const user = decode(token);
      if (user.username === this.router.snapshot.paramMap.get('username')) {
        this.isLogged = true;
        const profile = this.router.snapshot.paramMap.get('username');
        this.http.get<any>(GlobalConstants.apiURL + 'profile/' + profile).subscribe(data => {
          this.username = data.username;
          this.password = data.password;
        });
      }
    }
  }

  save() {
    const profile = this.router.snapshot.paramMap.get('username');

    const obj = {
      username: this.username,
      password: this.password,
    };

    this.http.post<any>(GlobalConstants.apiURL + 'profile/' + this.username, obj);
  }

}
