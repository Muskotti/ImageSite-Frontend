import { Component, OnInit } from '@angular/core';
import PostsInterface from './PostsInterface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: PostsInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    // fetch posts from backend
    const obj: PostsInterface = {
      title: 'Test',
      poster: 'Matti',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      likes: 5,
      text: 'Aute proident magna minim aute irure id cupidatat nisi id reprehenderit ad.',
    };

    const obj2: PostsInterface = {
      title: 'asd',
      poster: 'asd',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      likes: 100,
      text: 'Lorem anim cillum ut qui labore anim in culpa ullamco ad eu anim ullamco laboris.',
    };

    this.posts.push(obj);
    this.posts.push(obj2);
  }
}
