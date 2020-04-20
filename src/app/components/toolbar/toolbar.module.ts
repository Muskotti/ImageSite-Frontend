import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatToolbarModule,
    BrowserModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent,
  ]
})

export class ToolbarModule {}
