import { Component, OnInit } from '@angular/core';
import {ContactInfoService} from "../../services/contact-info.service";

@Component({
  selector: 'app-contact-bar',
  templateUrl: './contact-bar.component.html',
  styleUrls: ['./contact-bar.component.scss']
})
export class ContactBarComponent implements OnInit {
  public num!: string
  public mail!: string
  public hours!: string

  constructor(private contactInfoService: ContactInfoService) { }

  ngOnInit(): void {
    this.contactInfoService.hours$.subscribe(h => this.hours = h)
    this.contactInfoService.num$.subscribe(n => this.num = n)
    this.contactInfoService.mail$.subscribe(m => this.mail = m)
  }

}
