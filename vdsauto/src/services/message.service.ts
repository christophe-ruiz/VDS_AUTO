import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import { Subject} from "rxjs";
import Swal from "sweetalert2";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly msgUrl: string = serverUrl + '/messages'
  public msg$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.get();
  }

  get() {
    this.http.get<string>(this.msgUrl, httpOptionsBase).subscribe(m => {
      this.msg$.next(m)
    });
  }

  send(msg: string): void {
    this.http.put<string>(this.msgUrl, {msg: msg, token: this.sessionService.get('user')}, httpOptionsBase).subscribe(m => {
      this.msg$.next(m);

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Le message a été publié."
      });
    }, e => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de publier le message. Message d'erreur : " + e.message
      });
    })
  }
}
