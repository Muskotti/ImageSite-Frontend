import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from '../../global-constants';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';

export interface DialogData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  loggedIn = false;
  username: string;
  password: string;

  constructor(public dialog: MatDialog, private router: Router, private http: HttpClient) { }

  /**
   * Cheacks if user is logged in
   */
  ngOnInit(): void {
    const user = Cookies.get('login');
    if (user) {
      const obj = {
        token: user
      };

      this.http.post(GlobalConstants.apiURL + 'relogin', obj).subscribe(token => {
        this.log(token);
      });
    }
  }

  /**
   * Logs in to given token
   * @param token login token
   */
  log(token) {
    if (token.token) {
      const obj = decode(token.token);
      this.username = obj.username;
      this.loggedIn = true;
    }
  }

  /**
   * Goes to frontpage
   */
  goHome() {
    this.router.navigateByUrl('/frontpage');
  }

  /**
   * navigates to profile page
   */
  goToProfile() {
    this.router.navigate(['/profile', { username: this.username }]);
  }

  /**
   * Opens Login dialog
   */
  loginDialog() {
    const dialogRef = this.dialog.open(DialogLoginDialog, {
      width: '80%',
      data: { username: this.username, password: this.password }
    });

    dialogRef.afterClosed().subscribe(item => {
      if (item) {
        this.username = item.user;
        this.loggedIn = true;
        Cookies.set('login', item.token.token, { expires: 1 });
        location.reload();
      }
    });
  }

  /**
   * Opens registeration dialog
   */
  registerDialog() {
    const dialogRef = this.dialog.open(DialogRegisterDialog, {
      width: '80%',
      data: { username: this.username, password: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const dc = decode(result.token);
        this.username = dc.username;
        this.loggedIn = true;
        Cookies.set('login', result.token, { expires: 1 });
        location.reload();
      }
    });
  }

  /**
   * logsout and sets values to empty
   */
  logout() {
    this.router.navigateByUrl('/frontpage');
    this.username = '';
    this.password = '';
    this.loggedIn = false;
    Cookies.set('login', '', { expires: 1 });
    location.reload();
  }
}

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogLoginDialog {

  failed = false;

  constructor(
    public dialogRef: MatDialogRef<DialogLoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient) {}

  /**
   * Cheaks if given data is valid and logsin
   */
  login() {
    if (this.data.username && this.data.password) {
      const obj = {
        username: this.data.username,
        password: this.data.password,
      };

      this.http.post(GlobalConstants.apiURL + 'login', obj).subscribe(token => {
        if (token) {
          const tmp = {
            user: this.data.username,
            token,
          };
          this.dialogRef.close(tmp);
        } else {
          this.failed = true;
        }
      });
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogRegisterDialog {

  failed = false;

  constructor(
    public dialogRef: MatDialogRef<DialogRegisterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient) { }

  /**
   * Makes new user pased on given data and logs in to user
   */
  register() {
    if (this.data.username && this.data.password) {
      const obj = {
        username: this.data.username,
        password: this.data.password,
      };

      this.http.post(GlobalConstants.apiURL + 'register', obj).subscribe(item => {
        if (item) {
          this.dialogRef.close(item);
        } else {
          this.failed = true;
        }
      });
    }
  }
}
