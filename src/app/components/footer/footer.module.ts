import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatToolbarModule,
    BrowserModule
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent,
  ]
})

export class FooterModule {}
