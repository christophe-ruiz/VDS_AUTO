import { Injectable } from '@angular/core';
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly loginUrl = serverUrl + '/login';

  constructor(private http: HttpClient,
              private router: Router,
              private sessionService: SessionService) { }

  connect(pwd: string) {
    this.http.post(this.loginUrl, {pwd: pwd}, httpOptionsBase).subscribe((res) => {
      this.sessionService.set('user', true);
      this.router.navigate(['/admin'])
    }, (err) => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Mauvais mot de passe."
      });
    });
  }
}
