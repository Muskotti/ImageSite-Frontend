import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PostComponent } from './post.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    PostComponent
  ],
  exports: [
    PostComponent
  ]
})

export class PostModule { }
