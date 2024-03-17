import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

	readonly singedIn$ = this.authService.signedIn$;


	constructor(private authService: AuthService,
				private router: Router) {
	}

	ngOnInit(): void {

	}

	signOut() {
		this.authService.signOut().subscribe(() => {
			this.router?.navigate(['/home']);
		})
	}
}
