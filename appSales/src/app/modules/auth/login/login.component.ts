import {Component} from '@angular/core';
import {AuthService} from "@core/Services/auth/auth.service";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  frg: FormGroup;

  constructor(
    private auth: AuthService,
    private frb: FormBuilder
  ) {
    this.configForm();
  }

  configForm(): void {
    this.frg = this.frb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login(): void {
    this.auth.login(this.frg.value);
  }
}
