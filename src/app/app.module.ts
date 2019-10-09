import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
