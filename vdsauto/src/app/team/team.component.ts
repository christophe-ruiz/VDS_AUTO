import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../services/title.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(private titleService: TitleService) {
    titleService.setTitle("L'équipe");
  }

  ngOnInit(): void {
  }

}
