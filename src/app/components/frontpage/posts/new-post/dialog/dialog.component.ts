import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import PostsInterface from '../../PostsInterface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  newPostForm;

  constructor( private formBuilder: FormBuilder) {
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
      title: this.newPostForm.value.title,
      poster: 'asd',
      image: this.newPostForm.value.image,
      likes: 0,
      text: this.newPostForm.value.text,
    };
    console.log(obj);
    console.log(this.newPostForm.value);
  }

}
