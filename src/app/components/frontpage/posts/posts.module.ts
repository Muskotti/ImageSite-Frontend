import { NgModule } from '@angular/core';
import { PostsComponent } from './posts.component';
import { PostModule } from './post/post.module';

@NgModule({
  imports: [
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
