import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../services/title.service";
import {TeamService} from "../../services/team.service";
import {Mechanic} from "../../models/mechanic";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public team!: Mechanic[];

  constructor(private titleService: TitleService, private teamService: TeamService) {
    titleService.setTitle("L'équipe");
    this.teamService.team$.subscribe(t => this.team = t);
  }

  ngOnInit(): void {
  }

}
