import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../services/message.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('fold', [
      transition(':enter', [
        style({height: 0, overflow: 'hidden'}),
        animate('.3s ease', style({height: '*'}))
      ]),
      transition(':leave', [
        style({height: '*', overflow: 'hidden'}),
        animate('.3s ease', style({height: 0}))
      ])
    ])
  ]
})
export class MessageComponent implements OnInit {
  msg: string = "";
  hide: boolean = true;

  faTimes = faTimes;

  constructor(private msgService: MessageService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionService.hideMsg$.subscribe(h => {
      this.hide = h;
    });

    this.msgService.msg$.subscribe(m => {
      this.msg = m;
    });
  }

  hideMsg(): void {
    this.sessionService.set('hideMsg', true);
  }

}
