import { NgModule } from '@angular/core';
import { PostsComponent } from './posts.component';
import { PostModule } from './post/post.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    PostModule,
  ],
  declarations: [
    PostsComponent
  ],
  exports: [
    PostsComponent
  ]
})

export class PostsModule { }
