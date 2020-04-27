import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FrontpageComponent } from './frontpage.component';
import { PostsModule } from './posts/posts.module';

@NgModule({
  imports: [
    BrowserModule,
    PostsModule,
  ],
  declarations: [
    FrontpageComponent,
  ],
})

export class FrontpageModule { }
