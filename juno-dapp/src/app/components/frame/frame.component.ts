import {Component, Inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {signOut} from "@junobuild/core";

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss']
})
export class FrameComponent {


	readonly signOut = signOut;
	readonly signedIn$ = this.authService.signedIn$.subscribe(isSignedIn => isSignedIn);

	constructor(@Inject(AuthService) private authService: AuthService) {
	}

	klik(){

	}

}
