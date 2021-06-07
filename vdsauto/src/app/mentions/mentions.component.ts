import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.scss']
})
export class MentionsComponent implements OnInit {

  constructor() { }

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
