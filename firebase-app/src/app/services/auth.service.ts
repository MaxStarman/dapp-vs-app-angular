import {Injectable} from '@angular/core';
import firebase from "firebase/compat";
import {catchError, from, map, Observable, throwError} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import FirebaseError = firebase.FirebaseError;
import User = firebase.User;


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	readonly signedIn$: Observable<boolean>;

	constructor(
		private authFire: AngularFireAuth,
	) {
		this.signedIn$ = this.authFire.authState.pipe(
			map(user => !!user)
		);
	}

	// TODO optimize with Firebase functions

	get currentUser() {
		return from(this.authFire.currentUser).pipe(
			map(user => user)
		);
	}

	get userId() {
		return from(this.authFire.currentUser).pipe(
			map(user => user?.uid)
		)
	}

	signIn(params: any) {
		return from(this.authFire.signInWithEmailAndPassword(
				params.email, params.password
			)
		).pipe(
			catchError((error: FirebaseError) =>
				throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
			)
		);
	}

	updateUserProfile(user: User, username: string) {
		return from(user.updateProfile({
			displayName: username,
			photoURL: null
		}));
	}

	// TODO
	checkUsername() {
	}

	signOut() {
		return from(this.authFire.signOut())
	}

	registerUser(params: any) {
		return from(this.authFire.createUserWithEmailAndPassword(
			params.email, params.password
		)).pipe(
			catchError((error: FirebaseError) =>
				throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
			)
		);
	}

	private translateFirebaseErrorMessage({code, message}: FirebaseError) {
		if (code === "auth/user-not-found") {
			return "User not found.";
		}
		if (code === "auth/invalid-credential") {
			return "Invalid credentials.";
		}
		if (code === "auth/wrong-password") {
			return "User not found.";
		}
		return message;
	}
}
