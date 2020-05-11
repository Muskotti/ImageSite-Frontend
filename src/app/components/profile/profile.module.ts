import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from './profile.component';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  imports: [
    BrowserModule,
    SettingsModule
  ],
  declarations: [
    ProfileComponent,
  ],
  exports: [
    ProfileComponent,
  ]
})

export class ProfileModule { }
