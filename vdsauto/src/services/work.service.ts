import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Service} from "../models/service";

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  readonly services: Service[] = [
    new Service('Climatisation', 'La climatisation de votre véhicule est rechargée.', "clim.png"),
    new Service('Diagnostic', 'Nos mécaniciens identifient les anomalies sur votre véhicule.', "vidange.jpg"),
    new Service('Électronique', 'Votre véhicule est inspecté à l\'aide d\'un ordinateur afin de réaliser des réglages électroniques.', "vidange.jpg"),
    new Service('Freins', 'Les composants assurant le bon freinage du véhicule sont remplacés.', "vidange.jpg"),
    new Service('Géométrie', 'Nous réalisons les réglages nécessaires afin de s\'assurer du bon alignement ou parallélisme des roues de votre véhicule.', "vidange.jpg"),
    new Service('Mécanique générale', 'Nous réparons les composants défectueux de votre véhicule (embrayage, distribution...). Si besoin, les composants sont remplacés par des neufs.', "vidange.jpg"),
    new Service('Pneumatiques', 'Les pneus des roues de votre véhicule sont remplacés et équilibrés. Cette intervention est possible sur tous les diamètres de roues.', "pneus.jpg"),
    new Service('Révision', 'Votre véhicule est inspecté afin d\'identifier et réaliser l\'entretien nécessaire à son bon fonctionnement.', "vidange.jpg"),
  ]

  public services$: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>(this.services);

  constructor() {}
}
