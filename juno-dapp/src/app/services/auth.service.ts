import {Injectable} from '@angular/core';
import {authSubscribe, User} from '@junobuild/core';
import {map, Observable} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	isAdmin: boolean = false;

	userKey: string | undefined;

	user$: Observable<User | null> = new Observable((observer) =>
		authSubscribe((user) => {
			observer.next(user)
		})
	);

	signedIn$: Observable<boolean> = this.user$
		.pipe(
			map((user) => user !== null)
		);

	constructor() {
		this.user$.subscribe((user) => {
				this.userKey = user?.key
				user?.key == 'd2rpc-vtxui-fnxci-h4ppf-h3nh2-wp37f-qadqo-m4yky-ce6id-tvgvk-iae' ? this.isAdmin = true : this.isAdmin = false
			}
		)
	}

	get userId() {
		let userId = '';
		this.user$.subscribe((user) => {
			if (user) {
				userId = user?.key.toString()
			}
		})
		return userId;
	}
}
