import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from '../../global-constants';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  loginDialog() {
    const dialogRef = this.dialog.open(DialogLoginDialog, {
      width: '80%',
      data: { username: this.username, password: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.username = result;
        this.loggedIn = true;
      }
    });
  }

  logout() {
    this.loggedIn = false;
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
    private http: HttpClient) { }

  login() {
    if (this.data.username && this.data.password) {
      const obj = {
        username: this.data.username,
        password: this.data.password,
      };

      this.http.post(GlobalConstants.apiURL + 'login', obj).subscribe(item => {
        if (item) {
          this.dialogRef.close(this.data.username);
        } else {
          this.failed = true;
        }
      });
    }
  }

}
