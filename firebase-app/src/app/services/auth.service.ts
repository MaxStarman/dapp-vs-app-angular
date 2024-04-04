import {Injectable} from '@angular/core';
import firebase from "firebase/compat";
import {Observable, of, switchMap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {User} from "../models/user";
import {Router} from "@angular/router";


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// logged out = null
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

	async googleSignIn() {
		const provider = new firebase.auth.GoogleAuthProvider();
		const credential = await this.afAuth.signInWithPopup(provider);
		return this.updateUserData(credential.user);
	}

	updateUserData(user: any) {
		// Sets user data to firestore on login
		const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

		const data = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			// admin: user.admin
		}

		return userRef.set(data, {merge: true})

	}

	async signOut() {
		await this.afAuth.signOut();
		this.router.navigate(['/home']);
	}

	// signIn(params: any) {
	// 	return from(this.afAuth.signInWithEmailAndPassword(
	// 			params.email, params.password
	// 		)
	// 	).pipe(
	// 		catchError((error: FirebaseError) =>
	// 			throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
	// 		)
	// 	);
	// }

	// updateUserProfile(user: User, username: string) {
	// 	return from(user.updateProfile({
	// 		displayName: username,
	// 		photoURL: null
	// 	}));
	// }

	// registerUser(params: any) {
	// 	return from(this.afAuth.createUserWithEmailAndPassword(
	// 		params.email, params.password
	// 	)).pipe(
	// 		catchError((error: FirebaseError) =>
	// 			throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
	// 		)
	// 	);
	// }

	// private translateFirebaseErrorMessage({code, message}: FirebaseError) {
	// 	if (code === "auth/user-not-found") {
	// 		return "User not found.";
	// 	}
	// 	if (code === "auth/invalid-credential") {
	// 		return "Invalid credentials.";
	// 	}
	// 	if (code === "auth/wrong-password") {
	// 		return "User not found.";
	// 	}
	// 	return message;
	// }
}
