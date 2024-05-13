import {Injectable} from '@angular/core';
import {authSubscribe, Doc, getDoc, setDoc, User} from '@junobuild/core';
import {BehaviorSubject, from, map, Observable, of, switchMap} from 'rxjs';
import {UserData} from "../models/userData";

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	username$ = new BehaviorSubject<string>('')

	currentUser$: Observable<Doc<UserData> | null | undefined>;

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
		this.currentUser$ = this.user$.pipe(
			switchMap((user) => {
				if (user) {
					return from(this.getUserDoc(user.key)).pipe(
						map(userDoc => userDoc)
					)
				} else {
					return of(null)
				}
			})
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

	async setUserDoc(userData: UserData) {
		await setDoc<UserData>({
			collection: "users",
			doc: {
				key: userData.uid,
				data: userData
			}
		});
	}

	async getUserDoc(userId: string) {
		return await getDoc<UserData>({
			collection: 'users',
			key: userId
		})
	}
}
