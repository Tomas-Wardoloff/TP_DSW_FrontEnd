import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostsComponent } from "./components/posts/posts.component";
import { UserListComponent } from './components/Users/user-list/user-list.component';
import { UserFormComponent } from './components/Users/user-form/user-form.component';
import { AgentListComponent } from './components/Agents/agent-list/agent-list.component';
import { AthleteListComponent } from './components/Athletes/athlete-list/athlete-list.component';
import { ClubListComponent } from './components/clubs/club-list/club-list.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'posts', component: PostsComponent },

  // Users
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },

  // Agents
  { path: 'agents', component: AgentListComponent },
  { path: 'agents/new', component: UserFormComponent },
  { path: 'agents/edit/:id', component: UserFormComponent },

  // Athletes
  { path: 'athletes', component: AthleteListComponent },
  { path: 'athletes/new', component: UserFormComponent },
  { path: 'athletes/edit/:id', component: UserFormComponent },

  // Clubs
  { path: 'clubs', component: ClubListComponent },
  { path: 'clubs/new', component: UserFormComponent },
  { path: 'clubs/edit/:id', component: UserFormComponent },

  { path: '**', redirectTo: '' } // Ruta para 404
];

