import {Component} from '@angular/core';
import {initJuno} from '@junobuild/core';

@Component({
	selector: 'dapp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	async ngOnInit() {
		await initJuno({
			satelliteId: 'cw5ba-ciaaa-aaaal-advla-cai',
		});
	}
}
