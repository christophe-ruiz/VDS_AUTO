import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../../../models/offer";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  @Input()
  public offer!: Offer;

  constructor() { }

  ngOnInit(): void {
  }

}
