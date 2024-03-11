import {Injectable} from '@angular/core';
import {authSubscribe, setDoc, User} from '@junobuild/core';
import {map, Observable} from 'rxjs';
import {UserModel} from "../models/userModel";

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	readonly user$: Observable<User | null> = new Observable((observer) =>
		authSubscribe((user) => {
			observer.next(user)
		})
	);
	readonly signedIn$: Observable<boolean> = this.user$
		.pipe(
			map((user) => user !== null)
		);

	get userId() {
		let userId = '';
		this.user$.subscribe((user) => {
			if (user) {
				userId = user?.key.toString()
			}
		})
		return userId;
	}

	async addUser(userModel: UserModel) {
		await setDoc<UserModel>({
			collection: "users",
			doc: {
				key: userModel.id,
				data: userModel
			}
		});
	}
}
