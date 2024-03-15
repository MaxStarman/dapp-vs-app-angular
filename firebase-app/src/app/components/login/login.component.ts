import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../models/userModel";
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
	userModel = new UserModel('', '');

	singedIn$ = false

	constructor(
		@Inject(AuthService) private authService: AuthService,
		private router: Router,
		private fb: FormBuilder,
		public snackBar: MatSnackBar
	) {
	}


	ngOnInit() {
		this.setFormControls()
	}

	signIn() {
		alert('TODO')
	}

	private redirectToBlog() {
		this.router?.navigate(['/blog']);
	}

	private setFormControls() {
		this.userLoginForm = this.fb.group({
			username: [this.userModel.username, Validators.required]
		});
	}
}
