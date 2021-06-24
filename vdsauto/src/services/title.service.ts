import { Injectable } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  readonly website: string = "VDS Auto"

  constructor(private titleService: Title) {

  }

  public setTitle (subcategory: string)  {
    this.titleService.setTitle(this.website + ' - ' + subcategory);
  }

  public setDefaultTitle() {
    this.titleService.setTitle(this.website);
  }

}
