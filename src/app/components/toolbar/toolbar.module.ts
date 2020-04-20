import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    MatToolbarModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent,
  ]
})

export class ToolbarModule {}
