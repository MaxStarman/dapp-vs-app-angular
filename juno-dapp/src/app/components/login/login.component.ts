import {Component, Inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { signIn, signOut } from '@junobuild/core';


@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	readonly signedIn$ = this.authService.signedIn$;

	readonly signOut = signOut;
	readonly signIn = signIn;

	constructor(
		@Inject(AuthService) private authService: AuthService,
	) {}


	username: string = '';
	password: string = '';

	onSubmit() {
		// You can add your authentication logic here
		console.log('Username:', this.username);
		console.log('Password:', this.password);
	}
}
