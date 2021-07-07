import {Component, HostListener, OnInit} from '@angular/core';
import {Tab} from '../../models/tab';

@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements OnInit {
  public mobile: boolean = false;
  public closed: boolean = false;

  public tabs = [
    new Tab('home', "Accueil"),
    new Tab('services', "Services"),
    new Tab('equipe', "L'équipe"),
    new Tab('recrutement', "Recrutement"),
  ]

  constructor() { }

  private checkDevice ():void {
    if (window.screen.width < 1000) {
      this.mobile = this.closed = true;
    } else {
      this.mobile = this.closed = false;
    }
  }

  ngOnInit(): void {
    this.checkDevice();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkDevice();
  }

  mobileHidePanel(): void {
    if (this.mobile) this.closed = !this.closed;
  }

}
