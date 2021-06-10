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

  constructor() { }
}
