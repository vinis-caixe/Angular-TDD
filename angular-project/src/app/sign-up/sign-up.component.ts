import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl('')
  });

  apiProgress = false;
  signUpSuccess = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  onClickSignUp() {
    const body = this.form.value;
    delete body.passwordRepeat

    this.apiProgress = true;
    this.userService.signUp(body).subscribe(() => {
      this.signUpSuccess = true;
    });
  }

  isDisabled() {
    return this.form.get('password')?.value ? this.form.get('password')?.value !== this.form.get('passwordRepeat')?.value : true;
  }
}
