import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import PostsInterface from '../../PostsInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../../../../global-constants';


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

    this.http.get<any>(GlobalConstants.apiURL + 'posts/last').subscribe(item => {
      const obj: PostsInterface = {
        id: item.lenght,
        title: this.newPostForm.value.title,
        poster: 'jaska',
        image: this.newPostForm.value.image,
        likes: 0,
        text: this.newPostForm.value.text,
      };

      this.http.post<PostsInterface>(GlobalConstants.apiURL + 'posts', obj).subscribe(data => {
        console.log(data);
        location.reload();
      });
    });
  }

}
