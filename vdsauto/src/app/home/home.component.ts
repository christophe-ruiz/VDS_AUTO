import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TitleService} from "../../services/title.service";
import {WorkService} from "../../services/work.service";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: TitleService,
              private workService: WorkService,
              private teamService: TeamService) {
    titleService.setTitle('Garage automobile')
  }

  ngOnInit(): void {
  }

}
