import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Credentials, CredentialsService } from 'src/app/core/authentication/credentials.service';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  redirectUrl: string = undefined;
  @Input() fromDialog = false;
  @Output() loginEmit = new EventEmitter();
  messages: any[];
  picUrl: any;
  newMsg: any;
  userInfo: Credentials;
  password: any;
  show = false;
  interval;
  msgIndex = 0;

  constructor(
    private fb: FormBuilder,
    private rep: RepositoryService,
    private credite: CredentialsService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private spinner: NgxSpinnerService,
    private snack: SnackbarService
  ) { }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  createLoginForm() {
    this.formLogin = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(6),
        ],
      ],
      grant_type: ['password', Validators.required],
      client_id: ['0', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userInfo = this.credite.credentials;
    this.credite.setCredentials();

    this.createLoginForm();
    this.activeRoute.queryParams.subscribe((param) => {
      if (param && param.redirect) {
        this.redirectUrl = param.redirect;
      }
    });

    this.password = 'password';
  }

  showHidePass() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  loginUser() {
    this.rep
      .post('User/Login', this.formLogin.value)
      .subscribe((loginRes: any) => {
        this.spinner.hide();

        this.credite.setCredentials(loginRes.data.access_token);

        this.snack.showSuccess('به سامانه خوش آمدید');

        switch (this.credite.credentials?.UserType) {
          case '0':
            this.route.navigate(['/company/dashboard']);
            break;
          case '1':
            this.route.navigate(['/user/dashboard']);
            break;
          case '2':
            this.route.navigate(['/accountants/dashboard']);
            break;
          case '3':
            this.route.navigate(['/admin/dashboard']);
            break;
        }

        // if (this.redirectUrl !== undefined && this.redirectUrl !== null) {
        //   window.location.replace(this.redirectUrl);
        // } else {

        //   if (!this.fromDialog) {
        //     // if(this.)
        //     this.route.navigate(['/home']);
        //   } else {
        //     this.loginEmit.emit(true);
        //   }
        // }
      });
  }
  back() {
    if (!this.fromDialog) {
      this.route.navigate(['/']);
    } else {
      this.loginEmit.emit(false);
    }
  }

  // forgetPassword() {
  //   const dialogRef = this.dialog.open(ForgetPasswordComponent, {
  //     width: '25%',
  //     height: '40%',
  //   });

  // }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
