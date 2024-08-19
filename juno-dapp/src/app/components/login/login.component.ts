import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {InternetIdentityProvider, NFIDProvider, signIn} from '@junobuild/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	constructor(
		public authService: AuthService,
		private router: Router
	) {
	}

	readonly signInII = async () => await signIn({
		provider: new InternetIdentityProvider({
			domain: "ic0.app"
		})
	}).then(() => {
		console.log('ii sign in')
	}).catch(err => {
		console.error(err)
	});
	readonly singInNFID = async () => await signIn({
		provider: new NFIDProvider({
			appName: "Juno dBlog",
			logoUrl: ""
		})
	}).then(() => {
		console.log('nfID sign in')
	}).catch(err => {
		console.error(err)
	});

	navigateToBlog() {
		this.router?.navigate(['/blog']);
	}

}
