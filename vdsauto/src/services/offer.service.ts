import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {BehaviorSubject} from "rxjs";
import {Offer} from "../models/offer";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  readonly offersUrl = serverUrl + '/offers';
  public offers$: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<Offer[]>(this.offersUrl, httpOptionsBase).subscribe(o => this.offers$.next(o))
  }

  delOffer(o: Offer) {
    let l = this.offers$.value
    const index = l.indexOf(o);
    if (index > -1) {
      l.splice(index, 1);
    }
    this.offers$.next(l);
  }

  newOffer(title: string, desc:string) {
    let now = this.offers$.value
    now.push(new Offer(
      Date.now(),
      title,
      desc
    ))
    this.offers$.next(now)
  }

  save() {
    this.http.put(this.offersUrl, {offers: this.offers$.value}, httpOptionsBase).subscribe((res) => {
      console.log({team: this.offers$.value})
      console.log("FROM SERVER: ")
      console.log(res)

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Les offres ont été mises à jour."
      });
    }, e => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de mettre à jour les offres. Message d'erreur : " + e.message
      });
    })
  }
}
