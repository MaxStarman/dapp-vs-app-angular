
import {Component, Input, OnDestroy} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import { SubSink } from './sub-sink';


/**
 * A class that automatically unsubscribes all observables when the object gets destroyed
 */
@Component({
	selector: 'subs-component',
	template: '',
})
export class SubsComponent implements OnDestroy {
	/**
	 * The subscription sink object that stores all subscriptions
	 */
	subs = new SubSink();

	/**
	 * In progress indicator, that component is working on something.
	 */
	@Input()
	inProgress$ = new BehaviorSubject<boolean>(false);

	@Input()
	inProgressEvent$ = new BehaviorSubject<boolean>(false);

	/**
	 * The lifecycle hook that unsubscribes all subscriptions when the component / object gets destroyed
	 */
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
