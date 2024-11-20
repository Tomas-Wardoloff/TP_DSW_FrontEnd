import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostsComponent } from "./components/post/posts.component";
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { AgentListComponent } from './components/agent/agent-list/agent-list.component';
import { AthleteListComponent } from './components/athlete/athlete-list/athlete-list.component';
import { ClubListComponent } from './components/club/club-list/club-list.component';
import { AthleteFormComponent } from './components/athlete/athlete-form/athlete-form.component';
import { AgentFormComponent } from './components/agent/agent-form/agent-form.component';
import { ClubFormComponent } from './components/club/club-form/club-form.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },

  // Users
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },

  // Agents
  { path: 'agents', component: AgentListComponent },
  { path: 'agents/new', component: AgentFormComponent },
  { path: 'agents/edit/:id', component: AgentFormComponent },

  // Athletes
  { path: 'athletes', component: AthleteListComponent },
  { path: 'athletes/new', component: AthleteFormComponent },
  { path: 'athletes/edit/:id', component: AthleteFormComponent },

  // Clubs
  { path: 'clubs', component: ClubListComponent },
  { path: 'clubs/new', component: ClubFormComponent },
  { path: 'clubs/edit/:id', component: ClubFormComponent },

  { path: '**', redirectTo: '' } // Ruta para 404
];

