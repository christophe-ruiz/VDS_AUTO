import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Mechanic} from "../models/mechanic";


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  readonly defaultTeam: Mechanic[] = [
    new Mechanic("NomUn", "PrenomUn", "Mécanicien", "avatar.png"),
    new Mechanic("NomDeux", "PrenomDeux", "Mécanicien", "avatar.png"),
  ]
  public team$ :BehaviorSubject<Mechanic[]> = new BehaviorSubject<Mechanic[]>(this.defaultTeam)

  constructor() {
    setInterval(() => {
      console.log(this.team$.value)
    }, 1000)
  }

  delMate(m: Mechanic) {
    let l = this.team$.value
    const index = l.indexOf(m);
    if (index > -1) {
      l.splice(index, 1);
    }
  }

  newMate() {
    let now = this.team$.value
    now.push(new Mechanic())
  }
}
