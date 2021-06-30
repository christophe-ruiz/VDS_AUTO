import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Mechanic} from "../models/mechanic";
import {HttpClient} from "@angular/common/http";
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import Swal from "sweetalert2";
import {SessionService} from "./session.service";


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  readonly defaultTeam: Mechanic[] = [
    new Mechanic("", "", "", "mecanicien.png"),
  ]
  public team$ :BehaviorSubject<Mechanic[]> = new BehaviorSubject<Mechanic[]>(this.defaultTeam)
  readonly teamUrl = serverUrl + '/mechanics'

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.http.get<Mechanic[]>(this.teamUrl, httpOptionsBase).subscribe(t => this.team$.next(t))
  }

  delMate(m: Mechanic) {
    let l = this.team$.value
    const index = l.indexOf(m);
    if (index > -1) {
      l.splice(index, 1);
    }
    this.team$.next(l);
  }

  newMate() {
    let now = this.team$.value
    now.push(new Mechanic())
    this.team$.next(now)
  }

  save() {
    this.http.put(this.teamUrl, {team: this.team$.value, token: this.sessionService.get('user')}, httpOptionsBase).subscribe((res) => {
      console.log({team: this.team$.value})
      console.log("FROM SERVER: ")
      console.log(res)

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "L'équipe a été mise à jour."
      });
    }, e => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de mettre à jour l'équipe. Message d'erreur : " + e.message
      });
    })
  }
}
