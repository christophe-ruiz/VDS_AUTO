import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httpOptionsBase, serverUrl} from "../configs/server.config";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  uploadApplication (formValue: any) {
    console.log("FORM");
    console.log(formValue);
    this.http.post(serverUrl + '/applications', formValue, httpOptionsBase).subscribe((res) => {
      console.info("From server: " + res);
    });
  }
}
