import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../../global-constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  username: string;
  password: string;

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit(): void {
    const profile = this.router.snapshot.paramMap.get('username');
    this.http.get<any>(GlobalConstants.apiURL + 'profile/' + profile).subscribe(data => {
      this.username = data.username;
      this.password = data.password;
    });
  }

  save() {
    const profile = this.router.snapshot.paramMap.get('username');

    const obj = {
      username: this.username,
      password: this.password,
    };

    this.http.post<any>(GlobalConstants.apiURL + 'profile/' + this.username, obj).subscribe(data => {
      // this.password = data.password;
      console.log(data);
    });
  }

}
