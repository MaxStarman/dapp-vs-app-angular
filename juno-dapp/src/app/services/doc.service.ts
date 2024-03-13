import {Inject, Injectable} from '@angular/core';
import {combineLatest, from, map, Observable, of, shareReplay, startWith, Subject, switchMap} from "rxjs";
import {deleteDoc, Doc, getDoc, listDocs, setDoc, uploadFile, User} from "@junobuild/core";
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

	// TODO finish
	async deleteDocAndAsset(doc: Doc<Entry>, imgFullPath: string) {
		await deleteDoc<Entry>({
			collection: 'img_descriptions',
			doc: doc
		}).then(() => {
			this.reload()
		});

		// TODO pobrisi sliko iz storace ce je bil izbrisan zadnji doc s to sliko -> dodaj pogoj kdaj da brise slike
		// await deleteAsset({
		// 	collection: 'images',
		// 	fullPath: imgFullPath
		// });
	}
}
