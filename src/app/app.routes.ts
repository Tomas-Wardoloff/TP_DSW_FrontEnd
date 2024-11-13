import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostsComponent } from "./components/posts/posts.component";
import { UserListComponent } from './components/Users/user-list/user-list.component';
import { UserFormComponent } from './components/Users/user-form/user-form.component';
import { AgentListComponent } from './components/Agents/agent-list/agent-list.component';
import { AthleteListComponent } from './components/Athletes/athlete-list/athlete-list.component';
import { ClubListComponent } from './components/clubs/club-list/club-list.component';
import { AthleteFormComponent } from './components/Athletes/athlete-form/athlete-form.component';
import { AgentFormComponent } from './components/Agents/agent-form/agent-form.component';
import { ClubFormComponent } from './components/clubs/club-form/club-form.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'posts', component: PostsComponent },

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

