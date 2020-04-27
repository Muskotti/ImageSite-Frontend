import { Component, OnInit, Input } from '@angular/core';
import PostsInterface from '../PostsInterface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: PostsInterface;
  comments = [];
  panelOpenState = false;
  wait = true;
  comment = '';

  constructor() { }

  ngOnInit(): void {
  }

  // delete when comments are done
  makeComments() {
    const post1 = 'comment 1';
    const post2 = 'comment 2';
    const post3 = 'comment 3';

    this.comments.push(post1);
    this.comments.push(post2);
    this.comments.push(post3);
    this.wait = false;
  }

  /**
   * Post commet to backend and adds to the list
   */
  postComment() {
    // Todo: add comment to backend
    this.comments.push(this.comment);
  }

  /**
   * Opens comments section and starts a fetch
   */
  openComments() {
    // Todo: fetch comments
    this.panelOpenState = true;

    // delete when comments are done
    setTimeout(() => this.makeComments(), 5000);
  }

  /**
   * Closes comment section and emptyes comments list
   */
  closeComments() {
    this.panelOpenState = false;
    this.comments = [];
    this.wait = true;
  }

}
