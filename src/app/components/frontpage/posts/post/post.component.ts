import { Component, OnInit, Input } from '@angular/core';
import PostsInterface from '../PostsInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

@Injectable()
export class PostComponent implements OnInit {

  @Input() post: PostsInterface;
  comments = [];
  panelOpenState = false;
  wait = true;
  comment = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  /**
   * Post commet to backend and adds to the list
   */
  postComment() {
    this.comments.push(this.comment);
    const newComment = {
      // ToDo: get id
      id: 0,
      text: this.comment,
    };
    this.http.post<any>('http://localhost:3000/posts/0', newComment).subscribe(data => {
      console.log(data);
    });
  }

  /**
   * Opens comments section and starts a fetch
   */
  openComments() {
    this.panelOpenState = true;

    // ToDo: get comments based on id
    this.http.get<any>('http://localhost:3000/posts/0').subscribe(data => {
      // tslint:disable-next-line: forin
      for (const item of data.comments) {
        this.comments.push(item);
      }

      this.wait = false;
    });
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
