import { Component, Input } from '@angular/core';

@Component({
	selector: 'loading-card',
	templateUrl: './loading-card.component.html',
	styleUrls: ['./loading-card.component.scss']
})
export class LoadingCardComponent {
	@Input()
	lines!: number;

	constructor() {}
}
