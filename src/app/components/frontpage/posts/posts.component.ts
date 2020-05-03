import { Component, OnInit } from '@angular/core';
import PostsInterface from './PostsInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

@Injectable()
export class PostsComponent implements OnInit {

  posts: PostsInterface[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<PostsInterface>('http://localhost:3000/posts').subscribe(data => {
      // tslint:disable-next-line: forin
      for (const item in data) {
        this.posts.push(data[item]);
      }
    });
  }
}

