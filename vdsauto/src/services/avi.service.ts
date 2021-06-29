import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../configs/server.config";
import {BehaviorSubject} from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AviService {

  readonly aviUrl: string = serverUrl + '/mechanics/avi'

  public avis$ : BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http:HttpClient) {
    this.fetch();
  }

  fetch(): void {
    this.http.get<string[]>(this.aviUrl).subscribe( avis => {
      this.avis$.next(avis);
    });
  }

  delete(name: string): void {
    this.http.delete(this.aviUrl+'/'+name).subscribe(res => {
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "L'image a été supprimée."
      });
      this.fetch();
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de supprimer l'image. Veuillez réessayer plus tard." +
          "Message d'erreur: " + error.message
      });
      this.fetch();
    })
  }

  post(data: FormData): void {
    this.http.post(this.aviUrl, data).subscribe(res => {
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Les images ont été enregistrées."
      });
      this.fetch();
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible d'envoyer les images. Veuillez réessayer plus tard." +
          "Message d'erreur: " + error.message
      });
      this.fetch();
    })
  }
}
