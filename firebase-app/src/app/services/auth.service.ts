import {Injectable} from "@angular/core";
import firebase from "firebase/compat/app";
import {Observable, of, switchMap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {User} from "../models/user";
import {Router} from "@angular/router";


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	user$: Observable<User> | null;

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router
	) {

		// Get the auth state, then fetch the Firestore user document or return null
		// @ts-ignore
		this.user$ = this.afAuth.authState.pipe(
			switchMap(user => {
				// Logged in
				if (user) {
					return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
				} else {
					// Logged out
					return of(null);
				}
			})
		)
	}

	googleSignIn() {
		const provider = new firebase.auth.GoogleAuthProvider();
		return this.oAuthLogin(provider);
	}

	async signOut() {
		await this.afAuth.signOut().then(() => {
			this.router.navigate(['/home']);
		});
	}

	private async oAuthLogin(provider: any) {
		return this.afAuth.signInWithPopup(provider)
			.then((credential) => {
				this.updateUserData(credential.user);
			});
	}

	private updateUserData(user: any) {
		// Sets user data to firestore on login
		const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
		userRef.ref.get().then((doc) => {
			if (!doc.exists) {
				const data = {
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
					admin: false
				}
				userRef.set(data, {merge: true}).then(() => console.log('User created!'))
			}
			this.router.navigate(['/blog'])
		})
	}
}
