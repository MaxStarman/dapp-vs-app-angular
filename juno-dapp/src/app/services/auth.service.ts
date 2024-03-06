import {Injectable} from '@angular/core';
import {authSubscribe, User} from '@junobuild/core';
import {map, Observable} from 'rxjs';
import { SubsComponent } from '../shared/pattern/subs.component';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends SubsComponent{

	private _userId?: String;

	get userId() {
		return this._userId;
	}

	readonly user$: Observable<User | null> = new Observable((observer) =>
		authSubscribe((user) => {
			observer.next(user)
			this._userId = user?.owner
		})
	);

	// TODO prasaj ChatGPT kako subscribat temu elementu v komponenti
	readonly signedIn$: Observable<boolean> = this.user$
		.pipe(
			map((user) => user !== null)
		);
}
