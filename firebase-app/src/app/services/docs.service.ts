import {Injectable} from '@angular/core';
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Storage} from "@angular/fire/storage";

@Injectable({
	providedIn: 'root'
})
export class DocsService {


	constructor(private firestore: Firestore,
				private storage: Storage) {
	}


	getAllDocs() {
		return collectionData(collection(this.firestore, 'entries')) as Observable<any>
	}

	getMyDocs() {
		// return collectionData(collection(this.firestore, '')) as Observable<Entry>
	}

	// async addEntry(userId: string, data: Entry, file : File) {
	//
	// 	const imagePath = '';
	// 	const storageRef = ref(this.storage, imagePath);
	// 	await uploadBytesResumable(storageRef, file);
	// 	const url = await getDownloadURL(storageRef)
	//
	// 	const docRef = await addDoc(collection(this.firestore, 'entries'), data);
	// }

	// async deleteEntry(path: string) {
	// 	const  ref = doc(this.firestore, path);
	// 	await  deleteDoc(ref)
	// }

}
