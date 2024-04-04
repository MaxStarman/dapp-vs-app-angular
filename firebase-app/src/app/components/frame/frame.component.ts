import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss']
})
export class FrameComponent {

	constructor(public authService: AuthService) {
	}
}
