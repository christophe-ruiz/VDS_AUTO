import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
  public num$ : BehaviorSubject<string>  = new BehaviorSubject<string>("04 90 50 72 08");
  public mail$ : BehaviorSubject<string>  = new BehaviorSubject<string>("vds-auto13@orange.fr");
  public hours$  : BehaviorSubject<string>  = new BehaviorSubject<string>("Lundi à Vendredi de 8h à 12h et de 14h à 18h");
  public address$  : BehaviorSubject<string>  = new BehaviorSubject<string>("132 Avenue Adam de Craponne, 13250 Saint-Chamas");

  constructor() {

  }
}
