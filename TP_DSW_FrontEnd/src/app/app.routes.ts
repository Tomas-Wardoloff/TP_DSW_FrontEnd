import { NgModule, NgModuleDecorator } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";
import { HomepageComponent } from "./pages/homepage/homepage.component.js";
import { SignUpComponent } from "./pages/signup/signup.component.js";
import { PostsComponent } from "./pages/posts/posts.component.js";
import { LoginComponent } from "./pages/login/login.component.js";

export const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "signup", component: SignUpComponent},
  {path: "login", component: LoginComponent},
  {path: "posts", component: PostsComponent},
    {path: "**", redirectTo: ""},  
 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}