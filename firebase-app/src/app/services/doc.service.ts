import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QueryFn} from "@angular/fire/compat/firestore";
import {Entry} from "../models/entry";
import {map, Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class DocService {

	firestoreRef: AngularFirestoreCollection<Entry>;

	private dbPath = '/entries'

	constructor(
		private firestore: AngularFirestore
	) {
		this.firestoreRef = firestore.collection(this.dbPath)
	}


	getAllDocsObservable(): Observable<any> {
		return this.firestore.collection(this.dbPath).snapshotChanges()
			.pipe(
				map((docs) => {
						return docs.map((doc) => {
							const id = doc.payload.doc.id;
							const data = doc.payload.doc.data();
							return ({id, data});
							}
						)
					}
				)
			);
	}

	getMyDocsObservable(uid: string): Observable<any> {
		const queryFn: QueryFn = ref => ref.where('uid', '==', uid);
		return this.firestore.collection(this.dbPath, queryFn).snapshotChanges()
			.pipe(
				map((docs) => {
						return docs.map((doc) => {
							const id = doc.payload.doc.id;
							const data = doc.payload.doc.data();
							return ({id, data});
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
