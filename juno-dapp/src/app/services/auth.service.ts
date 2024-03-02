import {Injectable} from '@angular/core';
import {authSubscribe, User, UserData} from '@junobuild/core';
import {map, Observable} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	private _userId?: String;

	get userId() {
		return this._userId;
	}

	readonly user$: Observable<User | null> = new Observable((observer) =>
		authSubscribe((user) => {
			console.log('authUser', user)
			observer.next(user)
			this._userId = user?.owner

		})
	);

	readonly signedIn$: Observable<boolean> = this.user$
		.pipe(
			map((user) => user !== null)
		);
}
