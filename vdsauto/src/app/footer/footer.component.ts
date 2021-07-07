import { Component, OnInit } from '@angular/core';
import {ContactInfoService} from "../../services/contact-info.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public num!: string;
  public address!: string;
  public mail!: string;

  constructor(private contactInfoService: ContactInfoService) { }

  ngOnInit(): void {
    this.contactInfoService.address$.subscribe(a => this.address = a);
    this.contactInfoService.num$.subscribe(n => this.num = n);
    this.contactInfoService.mail$.subscribe(m => this.mail = m);
  }

}
