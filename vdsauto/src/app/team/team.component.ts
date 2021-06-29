import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../services/title.service";
import {TeamService} from "../../services/team.service";
import {Mechanic} from "../../models/mechanic";
import {serverUrl} from "../../configs/server.config";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  years: number = new Date().getFullYear() - 2006;
  public team!: Mechanic[];
  readonly serverUrl: string = serverUrl;

  constructor(private titleService: TitleService,
              private teamService: TeamService) {
    titleService.setTitle("L'équipe");
    this.teamService.team$.subscribe(t => this.team = t);
  }

  ngOnInit(): void {
  }

}
