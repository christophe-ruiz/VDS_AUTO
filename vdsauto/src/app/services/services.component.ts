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
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 30);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 1);
  }

}
