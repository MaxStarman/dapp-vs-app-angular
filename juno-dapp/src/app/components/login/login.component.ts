import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {signIn, signOut} from '@junobuild/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	userLoginForm!: FormGroup
	userModel = new User('', '', '', '', '');

	readonly signedIn$ = this.authService.signedIn$;

	readonly signOut = signOut;
	readonly signIn = signIn;

	constructor(
		@Inject(AuthService) private authService: AuthService,
		private router: Router,
		private fb: FormBuilder
	) {
	}

	ngOnInit() {
		this.setFormControls()
	}

	// TODO login gumb, kjer se lahko prijavi uporabnik ki je ze reg

	submit() {
		this.userModel = this.userLoginForm.value;
		console.log(this.userModel);
		this.signIn().then(value => {
			try {
				this.userModel.id = this.authService.userId!
				// this.saveUserToDatastore()
				this.router?.navigate(['/blog']);
			} catch (error) {
				console.log('Something went wrong! ', error);
			}
		})
	}

	saveUserToDatastore() {

	}

	private setFormControls() {
		this.userLoginForm = this.fb.group({
			username: [this.userModel.username, Validators.required],
			firstName: [this.userModel.firstName],
			lastName: [this.userModel.lastName],
			email: [this.userModel.email, [Validators.email]],
		});
	}
}
