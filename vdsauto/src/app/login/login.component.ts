import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup = this.fb.group({
    pwd: ['', Validators.required],
  });
  public requestedFormValidation: boolean = false;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private sessionService: SessionService,
              private router: Router) {
    if (this.sessionService.get('user')) router.navigate(['/admin']);
  }

  ngOnInit(): void {
  }

  requestFormValidation () :void {
    this.requestedFormValidation = true;

    if (this.loginForm.valid) {
      this.connect();
      // this.spontaneousForm.reset()
      this.requestedFormValidation = false;
    }
  }

  connect() {
    if (this.loginForm.invalid) return;
    this.loginService.connect(this.loginForm.get('pwd')!.value);
  }

}
