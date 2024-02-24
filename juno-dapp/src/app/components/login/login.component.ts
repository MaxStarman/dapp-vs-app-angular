import {Component, Inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {signIn, signOut} from '@junobuild/core';


@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	user = {
		username: '',
		email: '',
	}

	readonly signedIn$ = this.authService.signedIn$;

	readonly signOut = signOut;
	readonly signIn = signIn;

	constructor(
		@Inject(AuthService) private authService: AuthService,
	) {
	}


	formSubmission() {
		console.log(this.user)
		this.signIn()
		this.user.username = ''
		this.user.email = ''
	}
}
