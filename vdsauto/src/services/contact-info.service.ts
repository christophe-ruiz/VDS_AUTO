import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {Contacts} from "../models/contacts";
import Swal from "sweetalert2";
import {SessionService} from "./session.service";


@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
  readonly contactUrl: string = serverUrl + '/contacts'

  public num$ : BehaviorSubject<string>  = new BehaviorSubject<string>("04 90 50 72 08");
  public mail$ : BehaviorSubject<string>  = new BehaviorSubject<string>("vds-auto13@orange.fr");
  public hours$  : BehaviorSubject<string>  = new BehaviorSubject<string>("Lundi à Vendredi de 8h à 12h et de 14h à 18h");
  public address$  : BehaviorSubject<string>  = new BehaviorSubject<string>("132 Avenue Adam de Craponne, 13250 Saint-Chamas");

  constructor(private http:HttpClient, private sessionService: SessionService) {
    this.http.get<Contacts>(this.contactUrl, httpOptionsBase).subscribe(c => {
      this.num$.next(c.phone);
      this.mail$.next(c.mail);
      this.hours$.next(c.hours);
    })
  }

  send (contact: Contacts) {
    this.http.put<Contacts>(this.contactUrl, {contact: contact, token:this.sessionService.get('user')}, httpOptionsBase).subscribe(c => {
      this.num$.next(c.phone);
      this.mail$.next(c.mail);
      this.hours$.next(c.hours);

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Les informations de contact ont été mises à jour."
      });
    }, e => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de mettre à jour les informations de contact. Message d'erreur : " + e.message
      });
    })
  }
}
