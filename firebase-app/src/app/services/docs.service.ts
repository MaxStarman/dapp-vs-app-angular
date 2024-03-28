import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QueryFn} from "@angular/fire/compat/firestore";
import {Entry} from "../models/entry";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class DocsService {

	firestoreRef: AngularFirestoreCollection<Entry>;

	private dbPath = '/entries'

	constructor(private firestore: AngularFirestore,
				private authService: AuthService
	) {
		this.firestoreRef = firestore.collection(this.dbPath)
	}


	getAllDocsObservable(): Observable<any> {
		return this.firestore.collection(this.dbPath).valueChanges()
	}

	// TODO optimize uid
	getMyDocsObservable(uid: string | undefined): Observable<any> {
		const queryFn: QueryFn = ref => ref.where('uid', '==', uid);
		return this.firestore.collection(this.dbPath, queryFn).valueChanges();
	}

	createDoc(entry: Entry) {
		console.log(entry)
		return this.firestoreRef.add({...entry})
	}

	deleteDoc(id: string) {
		return this.firestoreRef.doc(id).delete();
	}
}
