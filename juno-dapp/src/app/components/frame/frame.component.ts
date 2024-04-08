import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {signOut} from "@junobuild/core";

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss']
})
export class FrameComponent {


	readonly signOut = signOut;

	constructor(public authService: AuthService) {
	}
}
