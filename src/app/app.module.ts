import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'home', component: HomeComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginComponent,
    SignupComponent,
    HomeComponent  
  ],
  providers: [],
})
export class AppModule { }