import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  uploadApplication (formValue: any) {
    console.log("FORM");
    console.log(formValue);
    this.http.post('http://localhost:9428/api/applications', formValue).subscribe((res) => {
      console.info("From server: " + res);
    });
  }
}
