import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';

 const appRoutes: Routes=[
  {
    path:'', component:NavBarComponent
  },
   {
     path:'signup', component:RegistrationComponent
   }
   
 ];
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
