import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	userLoginForm!: FormGroup
	signingIn = false;
	registering = false;
	readonly singedIn$ = this.authService.signedIn$;

	constructor(
		@Inject(AuthService) private authService: AuthService,
		private router: Router,
		private fb: FormBuilder,
		public snackBar: MatSnackBar
	) {
	}


	ngOnInit(): void {
		this.setFormControls()
	}

	signIn() {
		if (this.userLoginForm.valid) {
			this.signingIn = true;

			this.authService.signIn({
				username: this.userLoginForm.value.username,
				email: this.userLoginForm.value.email,
				password: this.userLoginForm.value.password
			}).subscribe({
				next: (user) => {
					if (user.user) {
						this.redirectToBlog()
					}
				},
				error: error => {
					this.signingIn = false;
					this.snackBar.open(error.message, "OK", {
						duration: 5000
					})
				}
			});
		}

	}

	registerUser() {
		if (this.userLoginForm.valid) {
			this.registering = true;

			this.authService.registerUser({
				username: this.userLoginForm.value.username,
				email: this.userLoginForm.value.email,
				password: this.userLoginForm.value.password
			}).subscribe({
				next: () => this.redirectToBlog(),
				error: error => {
					this.registering = false;
					this.snackBar.open(error.message, "OK", {
						duration: 5000
					})
				}
			})
		}
	}

	private redirectToBlog() {
		this.router?.navigate(['/blog']);
	}

	private setFormControls() {
		this.userLoginForm = this.fb.group({
			username: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}
}
