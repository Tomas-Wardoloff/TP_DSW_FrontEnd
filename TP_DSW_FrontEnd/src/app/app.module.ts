import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Asegúrate de que ReactiveFormsModule esté importado

import { AppComponent } from './app.component';
//import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './components/Users/user-form/user-form.component'; // Ajusta la ruta según tu estructura
import { UserListComponent } from './components/Users/user-list/user-list.component';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { AthleteListComponent } from './components/Athletes/athlete-list/athlete-list.component';
import { AgentListComponent } from './components/Agents/agent-list/agent-list.component';
import { ClubListComponent } from './components/clubs/club-list/club-list.component';



@NgModule({
  declarations: [
    //LoginComponent,
    UserFormComponent,
    UserListComponent,
    AthleteListComponent,
    AgentListComponent,
    ClubListComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, 
    RouterModule.forRoot([ // Configura las rutas de tu aplicación
      { path: 'users', component: UserListComponent },
      { path: 'users/new', component: UserFormComponent },
    ]),
    
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }