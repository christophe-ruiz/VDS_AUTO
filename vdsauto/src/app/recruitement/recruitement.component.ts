import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruitement',
  templateUrl: './recruitement.component.html',
  styleUrls: ['./recruitement.component.scss']
})
export class RecruitementComponent implements OnInit {

  public offers: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
