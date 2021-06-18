import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TabListComponent } from './tab-list/tab-list.component';
import { TabComponent } from './tab-list/tab/tab.component';
import { ServicesComponent } from './services/services.component';
import { TeamComponent } from './team/team.component';
import { ContactBarComponent } from './contact-bar/contact-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MentionsComponent } from './mentions/mentions.component';
import { RecruitementComponent } from './recruitement/recruitement.component';
import { ConsentComponent } from './consent/consent.component';
import { ApplyComponent } from './recruitement/apply/apply.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AdminComponent } from './admin/admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageComponent } from './home/message/message.component';
import { OfferComponent } from './recruitement/offer/offer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TabListComponent,
    TabComponent,
    ServicesComponent,
    TeamComponent,
    ContactBarComponent,
    FooterComponent,
    MentionsComponent,
    RecruitementComponent,
    ConsentComponent,
    ApplyComponent,
    AdminComponent,
    MessageComponent,
    OfferComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        FontAwesomeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
