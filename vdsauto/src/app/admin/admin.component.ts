import { Component, OnInit } from '@angular/core';
import {ContactInfoService} from "../../services/contact-info.service";
import {TeamService} from "../../services/team.service";
import {WorkService} from "../../services/work.service";
import {Mechanic} from "../../models/mechanic";
import {Service} from "../../models/service";
import {TitleService} from "../../services/title.service";
import Swal from 'sweetalert2'
import {animate, style, transition, trigger} from "@angular/animations";
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('fold', [
      transition(':enter', [
        style({height: 0, overflow: 'hidden'}),
        animate('.3s ease', style({height: '*'}))
      ]),
      transition(':leave', [
        style({height: '*', overflow: 'hidden'}),
        animate('.3s ease', style({height: 0}))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  public team: Mechanic[] = [];
  public services: Service[] = []

  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  public teamUnfolded: boolean = false;
  public msgUnfolded: boolean = false;

  public msg: string = "";

  constructor(private contactInfoService: ContactInfoService,
              private teamService: TeamService,
              private workService: WorkService,
              private titleService: TitleService,
              private msgService: MessageService) {
    this.teamService.team$.subscribe(m => this.team = m)
    this.workService.services$.subscribe(s => this.services = s)
    this.msgService.msg$.subscribe(m => this.msg = m);

  }

  ngOnInit(): void {
    this.titleService.setTitle('Administration')
  }

  newMate(): void {
    this.teamService.newMate()
  }

  delMate(m: Mechanic):void {
    // Swal.fire()
    this.teamService.delMate(m);
  }

  saveTeam(): void {
    this.teamService.save();
  }

  saveMsg():void {
    this.msgService.send(this.msg)
  }

}
