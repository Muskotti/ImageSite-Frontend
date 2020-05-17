import { Component, OnInit } from '@angular/core';
import PostsInterface from './PostsInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../../global-constants';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

@Injectable()
export class PostsComponent implements OnInit {

  posts: PostsInterface[] = [];

  constructor(private http: HttpClient) { }

  /**
   * Gets the posts from backend and sets them to the list
   */
  ngOnInit(): void {
    this.http.get<any>(GlobalConstants.apiURL + 'posts').subscribe(data => {
      for (const item of data.data) {
        this.posts.push(item);
      }
      this.posts.reverse();
    });
  }
}

