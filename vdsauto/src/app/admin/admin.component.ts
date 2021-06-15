import { Component, OnInit } from '@angular/core';
import {ContactInfoService} from "../../services/contact-info.service";
import {TeamService} from "../../services/team.service";
import {WorkService} from "../../services/work.service";
import {Mechanic} from "../../models/mechanic";
import {Service} from "../../models/service";
import {TitleService} from "../../services/title.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public team: Mechanic[] = [];
  public services: Service[] = []

  constructor(private contactInfoService: ContactInfoService,
              private teamService: TeamService,
              private workService: WorkService,
              private titleService: TitleService) {
    this.teamService.team$.subscribe(m => {
      this.team = m;
    })
    this.workService.services$.subscribe(s => {
      this.services = s;
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('Administration')
  }

  newMate(): void {
    this.teamService.newMate()
  }

  delMate(m: Mechanic):void {
    this.teamService.delMate(m);
  }

}
