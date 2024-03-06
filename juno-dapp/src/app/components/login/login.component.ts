import {Component, Inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {signIn, signOut} from '@junobuild/core';
import {User} from "../../classes/user";
import { SubsComponent } from '../../shared/pattern/subs.component';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SubsComponent{

	user = {
		username: '',
		firstName: '',
		lastName: '',
		email: '',
	}

	userID: String = '';
	model?: User;

	readonly signedIn$ = this.authService.signedIn$;

	readonly signOut = signOut;
	readonly signIn = signIn;

	constructor(
		@Inject(AuthService) private authService: AuthService,
	) {
		super();
	}


	signInSubmit() {

		this.signIn().then(value => {
			try {
				this.userID = this.authService.userId!
				this.model = new User(
					this.userID,
					this.user.username,
					this.user.firstName,
					this.user.lastName,
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
			this.user.firstName = '';
			this.user.lastName= '';
			this.user.email = '';
		})
	}
}
