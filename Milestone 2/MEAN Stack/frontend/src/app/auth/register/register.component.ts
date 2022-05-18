import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  console = console;

  registerForm = this.formBuilder.group({
    email: '',
    name: '',
    password: '',
    password2: '',
  });

  constructor(
    private titleService: Title,
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
    this.titleService.setTitle("Register - NFT");
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("Register button clicked");
    const { email, name, password, password2 } = this.registerForm.controls;
    console.log(email.value);
    const headers = { 'content-type': 'application/json' }
    this.http.post(
      "/user/register",
      {
        email: email.value,
        name: name.value,
        password: password.value,
        password2: password2.value,
      },
      { 'headers': headers })
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })

    // this.registerForm.reset();
  }

}
