import {Component, Inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {signIn, signOut} from '@junobuild/core';
import {User} from "../../classes/user";


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

	model?: User;

	readonly signedIn$ = this.authService.signedIn$;

	readonly signOut = signOut;
	readonly signIn = signIn;

	constructor(
		@Inject(AuthService) private authService: AuthService,
	) {
	}


	signInSubmit() {

		this.signIn().then(value => {
			try {

				this.model = new User(
					this.authService.userId!,
					this.user.username,
					this.user.email,
					true
				)
			} catch (error) {
				console.log('Something went wrong! ', error);
			}
			console.log(this.model)
		})

	}

	singOutSubmit() {
		this.signOut().then(value => {
			this.user.username = '';
			this.user.email = '';
		})
	}
}
