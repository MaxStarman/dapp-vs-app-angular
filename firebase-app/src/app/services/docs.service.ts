import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QueryFn} from "@angular/fire/compat/firestore";
import {Entry} from "../models/entry";
import {AuthService} from "./auth.service";

@Injectable({
	providedIn: 'root'
})
export class DocsService {

	firestoreRef: AngularFirestoreCollection<Entry>;
	allDocs$;
	myDocs$ = [];

	private uid: string | undefined;
	private dbPath = '/entries'

	constructor(private firestore: AngularFirestore,
				private authService: AuthService
	) {
		this.firestoreRef = firestore.collection(this.dbPath)
		this.allDocs$ = this.getAllDocsObservable();
		// this.myDocs$ = this.getMyDocsObservable();
		this.authService.userId.subscribe(uid => {
			this.uid = uid;
		})
	}


	getAllDocsObservable() {
		return this.firestore.collection(this.dbPath).valueChanges()
	}

	getMyDocsObservable() {
		const queryFn: QueryFn = ref => ref.where('userId', '==', this.uid);

		return this.firestore.collection(this.dbPath, queryFn).valueChanges()
	}

	createDoc(entry: Entry) {
		console.log(entry)
		return this.firestoreRef.add({...entry})
	}

	deleteDoc(id: string) {
		return this.firestoreRef.doc(id).delete();
	}
}
