import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  readonly applicationUrl = serverUrl + '/applications';

  constructor(private http: HttpClient) { }

  uploadApplication (formData: FormData) {
    console.log("FORM");
    // console.log(formData.get('resume'));
    this.http.post(this.applicationUrl, formData).subscribe((res) => {
      console.info("From server: ");
      console.info(res);

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Votre candidature a été envoyée et une confirmation a été envoyée sur votre adresse e-mail."
      });
    }, (err) => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible d'envoyer la candidature. " +
          "Veuillez réessayer plus tard ou envoyer vos informations par mail. " +
          "\nMessage d'erreur : " + err.message
      });
    });
  }
}
