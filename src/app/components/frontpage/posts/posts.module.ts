import { NgModule } from '@angular/core';
import { PostsComponent } from './posts.component';
import { PostModule } from './post/post.module';
import { BrowserModule } from '@angular/platform-browser';
import { NewPostModule } from './new-post/new-post.module';

@NgModule({
  imports: [
    BrowserModule,
    PostModule,
    NewPostModule,
  ],
  declarations: [
    PostsComponent,
  ],
  exports: [
    PostsComponent
  ]
})

export class PostsModule { }
