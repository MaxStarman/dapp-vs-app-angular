import {Component, OnInit} from '@angular/core';
import {initJuno} from '@junobuild/core';

@Component({
	selector: 'dapp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	async ngOnInit() {
		await initJuno({
			satelliteId: 'cw5ba-ciaaa-aaaal-advla-cai',
		});
	}
}
