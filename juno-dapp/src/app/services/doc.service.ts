import {Inject, Injectable} from '@angular/core';
import {combineLatest, from, map, Observable, of, shareReplay, startWith, Subject, switchMap, take} from "rxjs";
import {deleteAsset, deleteDoc, Doc, getDoc, listDocs, setDoc, uploadFile, User} from "@junobuild/core";
import {AuthService} from "./auth.service";
import {Entry} from "../models/entry";
import {nanoid} from "nanoid";
import {FormGroup} from "@angular/forms";
import {UserModel} from "../models/userModel";

@Injectable({
	providedIn: 'root'
})
export class DocService {

	private reloadSubject = new Subject<void>();

	// Return all documents in the collection
	allDocs$: Observable<Doc<Entry>[]> = this.reloadSubject.pipe(
		startWith(undefined),
		switchMap(() => {
			return from(
				listDocs<Entry>({
					collection: 'img_descriptions'
				})
			).pipe(map(({items}) => items));
		}),
		startWith([]),
		shareReplay({bufferSize: 1, refCount: true})
	);

	// Return all documents for loged in user
	myDocs$: Observable<Doc<Entry>[]> = combineLatest([
		this.authService.user$,
		this.reloadSubject.pipe(startWith(undefined)),
	]).pipe(
		switchMap(([user, _]) => {
			if (user === null) {
				return of([]);
			}
			return from(
				listDocs<Entry>({
					collection: 'img_descriptions',
					filter: {owner: user.key}
				})
			).pipe(map(({items}) => items));
		}),
		startWith([]),
		shareReplay({bufferSize: 1, refCount: true})
	);

	// TODO inProgress subject for displaying mat-spinner
	private inProgress$ = new Subject<boolean>()

	constructor(@Inject(AuthService) private readonly authService: AuthService) {
	}

	reload(value?: any) {
		//ts-ignore
		this.reloadSubject.next(value);
	}

	async uploadAndSetEntry(user: User, file: File | undefined, form: FormGroup, username: string) {
		let url;

		if (file !== undefined) {
			const filename = `${user.key}-${file.name}`;

			const {downloadUrl} = await uploadFile({
				collection: 'images',
				data: file,
				filename,
			});

			url = downloadUrl;
		}

		const key = nanoid();

		await setDoc({
			collection: 'img_descriptions',
			doc: {
				key,
				data: {
					creator: username,
					text: form.value.entry,
					...(url !== undefined && {url}),
				},
			},
		});
	}

	async setUserDoc(userModel: UserModel) {
		await setDoc<UserModel>({
			collection: "users",
			doc: {
				key: userModel.id,
				data: userModel
			}
		});
	}

	async getUserDoc(userId: string) {
		return await getDoc<UserModel>({
			collection: 'users',
			key: userId
		}).catch((err) => console.log(err))
	}

	async deleteDocAndAsset(doc: Doc<Entry>, imgFullPath: string, admin: boolean) {
		await deleteDoc<Entry>({
			collection: 'img_descriptions',
			doc: doc
		}).then(() => {
			if (admin) {
				this.checkIfLastImagesInAllDocs(imgFullPath).subscribe(deleteImg => {
					if (deleteImg) {
						this.deleteImageFromStorage(imgFullPath)
					}
				})
			} else {
				this.checkIfLastImagesInMyDocs(imgFullPath).subscribe(deleteImg => {
					if (deleteImg) {
						this.deleteImageFromStorage(imgFullPath)
					}
				})
			}
			this.reload()
		});

	}

	private async deleteImageFromStorage(imgFullPath: string) {
		await deleteAsset({
			collection: 'images',
			fullPath: imgFullPath
		});
	}

	/**
	 * Return Observable<boolean> if there is only one doc left with a specific image URL.
	 * @param imgUrl
	 * @private
	 */
	private checkIfLastImagesInMyDocs(imgUrl: string) {
		let count = 0;
		return this.myDocs$.pipe(
			take(1),
			map(docs => {
				for (const doc of docs) {
					if (doc.data.url && doc.data.url.endsWith(imgUrl)) {
						count++;
					}
				}
				return count === 1;
			})
		)
	}

	// For admin asset delete
	private checkIfLastImagesInAllDocs(imgUrl: string) {
		let count = 0;
		return this.allDocs$.pipe(
			take(1),
			map(docs => {
				for (const doc of docs) {
					if (doc.data.url && doc.data.url.endsWith(imgUrl)) {
						count++;
					}
				}
				return count === 1;
			})
		)
	}
}
