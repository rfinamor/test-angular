import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { first } from 'rxjs';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],

})
export class Login implements OnInit {
  public loginForm!: FormGroup;
  public loginErrorMsg = '';
  public loading = false;
  public submitted = false;
  public data : any;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
      this.loginForm = this.formBuilder.group({
        user: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  onSubmit():void {
    this.submitted = true;
    this.loginErrorMsg = '';

    if (this.loginForm.invalid) {
        this.loginErrorMsg = 'Datos invalidos';
        return;
    }

    this.loading = true;
    this.loginService.login(this.loginForm.controls['user'].value, this.loginForm.controls['password'].value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.router.navigate([environment.shoppingPath]);
                
            },
            error: (error: string) => {
                this.loginErrorMsg = error;
                this.loading = false;
            }
        });
}
}
