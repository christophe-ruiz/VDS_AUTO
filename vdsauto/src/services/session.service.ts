import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public hideMsg$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.get('hideMsg'));

  constructor() { }

  get(key: string): any {
    return sessionStorage ? sessionStorage.getItem(key) : null;
  }

  set(key: string, value: any): void {
    if (sessionStorage) {
      sessionStorage.setItem(key, value);
      if (key === "hideMsg") this.hideMsg$.next(value);
    }
  }

  remove(key:string){
    sessionStorage.removeItem(key);
  }
}
