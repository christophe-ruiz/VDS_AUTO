import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../services/title.service";
import {Service} from "../../models/service";
import {WorkService} from "../../services/work.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public services: Service[] = [];

  constructor(private titleService: TitleService,
              private workService: WorkService) {
    titleService.setTitle('Services');
    workService.services$.subscribe(s => this.services = s);
  }

  ngOnInit(): void {
  }

}
