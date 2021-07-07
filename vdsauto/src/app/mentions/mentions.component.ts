import { Component, OnInit } from '@angular/core';
import {ContactInfoService} from "../../services/contact-info.service";

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.scss']
})
export class MentionsComponent implements OnInit {
  public address!: string;
  public num!: string;
  public mail!: string;

  constructor(private contactInfoService: ContactInfoService) {
    this.contactInfoService.address$.subscribe(a => this.address = a);
    this.contactInfoService.mail$.subscribe(m => this.mail = m);
    this.contactInfoService.num$.subscribe(t => this.num = t);
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
