import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import PostsInterface from '../../PostsInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

@Injectable()
export class DialogComponent implements OnInit {

  newPostForm;

  constructor( private formBuilder: FormBuilder, private http: HttpClient) {
    this.newPostForm = this.formBuilder.group({
      title: '',
      image: '',
      text: '',
    });
   }

  ngOnInit(): void {
  }

  submitNewPost() {
    // Todo: submit to backend
    const obj: PostsInterface = {
      id: 3,
      title: this.newPostForm.value.title,
      poster: 'asd',
      image: this.newPostForm.value.image,
      likes: 0,
      text: this.newPostForm.value.text,
    };

    this.http.post<PostsInterface>('http://localhost:3000/posts', obj).subscribe(data => {
      console.log(data);
    });
  }

}
