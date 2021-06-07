import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TeamComponent} from "./team/team.component";
import {ContactComponent} from "./contact/contact.component";
import {ServicesComponent} from "./services/services.component";
import {MentionsComponent} from "./mentions/mentions.component";

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'equipe', component:TeamComponent },
  { path: 'contact', component:ContactComponent },
  { path: 'services', component:ServicesComponent },
  { path: 'mentions-legales', component:MentionsComponent },
  { path: 'home', redirectTo:'' },
  { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
