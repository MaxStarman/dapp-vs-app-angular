import {Injectable} from '@angular/core';
import firebase from "firebase/compat";
import {catchError, from, map, Observable, throwError} from "rxjs";
import {UserModel} from "../models/userModel";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import FirebaseError = firebase.FirebaseError;

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	readonly signedIn$: Observable<boolean>;

	// Observable user
	constructor(
		private auth: AngularFireAuth
	) {
		this.signedIn$ = this.auth.authState.pipe(
			map(user => !!user)
		);
	}

	get currentUser() {
		return from(this.auth.currentUser).pipe(
			map(user => user)
		);
	}

	get userId() {
		return from(this.auth.currentUser).pipe(
			map(user => user?.uid)
		)
	}

	signIn(params: UserModel) {
		return from(this.auth.signInWithEmailAndPassword(
			params.email, params.password
		)).pipe(
			catchError((error: FirebaseError) =>
				throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
			)
		);
	}

	signOut() {
		return from(this.auth.signOut())
	}

	registerUser(params: UserModel) {
		return from(this.auth.createUserWithEmailAndPassword(
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
