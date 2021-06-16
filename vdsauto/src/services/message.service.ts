import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly msgUrl: string = serverUrl + '/messages'
  public msg$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    this.get();
  }

  get() {
    this.http.get<string>(this.msgUrl, httpOptionsBase).subscribe(m => {
      this.msg$.next(m)
    });
  }

  send(msg: string): void {
    this.http.put<string>(this.msgUrl, {msg: msg}, httpOptionsBase).subscribe(m => {
      this.msg$.next(m);
    });
  }
}
