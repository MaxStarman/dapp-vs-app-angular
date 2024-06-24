import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QueryFn} from "@angular/fire/compat/firestore";
import {Entry} from "../models/entry";
import {finalize, map, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
	providedIn: 'root'
})
export class DocService {

	firestoreRef: AngularFirestoreCollection<Entry>;
	percentage!: Observable<any>;

	private dbPath = '/entries'

	constructor(
		private firestore: AngularFirestore,
		private storage: AngularFireStorage
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

	uploadFileAndCreateDoc(entry: Entry, file: File) {
		const path = `${Date.now()}_${file.name}`;
		const storageRef = this.storage.ref(path);

		// The main task
		const task = this.storage.upload(path, file);

		this.percentage = task.percentageChanges();

		return task.snapshotChanges().pipe(
			finalize(() => {
					storageRef.getDownloadURL().subscribe((downloadURL) => {
						entry.url = downloadURL
						entry.imagePath = path
						this.firestoreRef.add({...entry})
					})

				}
			)
		);
	}

	async deleteFileAndDoc(id: string, imagePath: string) {
		const storageRef = this.storage.ref(imagePath)
		return this.firestoreRef.doc(id).delete().then(() => {
			storageRef.delete()
		})
	}
}
