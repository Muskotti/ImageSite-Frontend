import { NgModule } from '@angular/core';
import { NewPostComponent } from './new-post.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DialogModule,
  ],
  declarations: [
    NewPostComponent,
  ],
  exports: [
    NewPostComponent
  ]
})

export class NewPostModule { }
