import { Component, OnInit } from '@angular/core';
import {Tab} from '../../models/tab';

@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements OnInit {

  public tabs = [
    new Tab('home', "Accueil"),
    new Tab('services', "Services"),
    new Tab('equipe', "L'équipe"),
    new Tab('recrutement', "Recrutement"),
    new Tab('contact', "Contacter")
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
