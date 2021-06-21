import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from "../../../models/offer";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  public toggle: boolean = false;

  @Input()
  public offer!: Offer;

  @Input()
  public unselect!: BehaviorSubject<number>;

  @Output()
  public selected: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
    this.unselect.subscribe(i => {
      if (this.offer.id != i && this.toggle)
        this.toggle = false
    });
  }

  switch(): void {
    this.toggle = !this.toggle;
    if (this.toggle) this.selected.emit(this.offer.id);
    else this.selected.emit(0);
  }

}
