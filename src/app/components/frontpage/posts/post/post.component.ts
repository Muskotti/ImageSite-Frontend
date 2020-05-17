import { Component, OnInit, Input } from '@angular/core';
import PostsInterface from '../PostsInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../../../global-constants';

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
    const newComment = {
      id: this.post.id,
      text: this.comment,
    };
    this.http.post<any>(GlobalConstants.apiURL + 'posts/' + this.post.id, newComment).subscribe(data => {
      this.comments.push(data.text);
      this.comment = '';
    });
  }

  /**
   * Opens comments section and starts a fetch
   */
  openComments() {
    this.panelOpenState = true;

    this.http.get<any>(GlobalConstants.apiURL + 'posts/' + this.post.id).subscribe(data => {
      if (data) {
        for (const item of data.comments) {
          this.comments.push(item);
        }
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
