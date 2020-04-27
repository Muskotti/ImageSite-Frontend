import { Component, OnInit, Input } from '@angular/core';
import PostsInterface from '../PostsInterface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: PostsInterface;

  constructor() { }

  ngOnInit(): void {
  }

  test() {
    console.log(this.post);
  }

}
