import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  canPost = false;

  constructor(public dialog: MatDialog) { }

  /**
   * Cheacks if the user is logged in
   */
  ngOnInit(): void {
    if (Cookies.get('login')) {
      this.canPost = true;
    }
  }

  /**
   * Opens dialog component
   */
  newPostDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

