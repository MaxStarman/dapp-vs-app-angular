import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	constructor(public authService: AuthService,
				private router: Router) {
	}

	navigateToBlog() {
		this.router?.navigate(['/blog']);
	}
}
