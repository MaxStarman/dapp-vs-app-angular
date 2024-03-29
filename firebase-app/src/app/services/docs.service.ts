import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QueryFn} from "@angular/fire/compat/firestore";
import {Entry} from "../models/entry";
import {AuthService} from "./auth.service";
import {map, Observable} from "rxjs";
import {FireDoc} from "../models/fireDoc";

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
		return this.firestore.collection(this.dbPath).snapshotChanges()
			.pipe(
				map((docs) => {
						return docs.map((doc) => {
								const data = doc.payload.doc.data() as Entry;
								const docId = doc.payload.doc.id;
								return ({id: docId, data}) as FireDoc;
							}
						)
					}
				)
			);
	}

	// TODO optimize uid
	getMyDocsObservable(uid: string | undefined): Observable<any> {
		const queryFn: QueryFn = ref => ref.where('uid', '==', uid);
		return this.firestore.collection(this.dbPath, queryFn).snapshotChanges()
			.pipe(
				map((docs) => {
						return docs.map((doc) => {
								const data = doc.payload.doc.data() as Entry;
								const docId = doc.payload.doc.id;
								return ({id: docId, data}) as FireDoc;
							}
						)
					}
				)
			);
	}

	createDoc(entry: Entry) {
		return this.firestoreRef.add({...entry})
	}

	deleteDoc(id: string) {
		return this.firestoreRef.doc(id).delete();
	}
}
