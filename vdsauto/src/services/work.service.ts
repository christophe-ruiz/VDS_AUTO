import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Service} from "../models/service";

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  readonly services: Service[] = [
    new Service('Climatisation', 'La climatisation de votre véhicule est rechargée.', "clim.png"),
    new Service('Diagnostic', 'Nos mécaniciens identifient les anomalies sur votre véhicule.', "diag.jpg"),
    new Service('Électronique', 'Votre véhicule est inspecté à l\'aide d\'un ordinateur afin de réaliser des réglages électroniques.', "electronique.png"),
    new Service('Freins', 'Les composants assurant le bon freinage du véhicule sont remplacés.', "disqueetfreins.png"),
    new Service('Géométrie', 'Nous réalisons le parallélisme ou la géométrie totale afin de s\'assurer du bon réglage des trains roulants.', "geo.png"),
    new Service('Mécanique lourde', 'Intervention sur les composants essentiels au fonctionnement du véhicule (embrayage, boîte de vitesses, moteur, composants usés par l\'utilisation...).', "meca.png"),
    new Service('Pneumatiques', 'Vos pneumatiques sont minutieusement remplacés et équilibrés. Nous veillons à l\'homogénéité de leur usure sur toute les bandes de roulement afin de leur permettre d\'effectuer le maximum de kilomètres en toute sécurité.', "pneus.jpg"),
    new Service('Révision', 'Votre véhicule est inspecté afin d\'identifier et réaliser l\'entretien nécessaire à son bon fonctionnement.', "revision.png"),
  ]

  public services$: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>(this.services);

  constructor() {}
}
