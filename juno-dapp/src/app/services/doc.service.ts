import {Inject, Injectable} from '@angular/core';
import {combineLatest, from, map, Observable, of, shareReplay, startWith, Subject, switchMap} from "rxjs";
import {deleteAsset, deleteDoc, Doc, listDocs, setDoc, uploadFile, User} from "@junobuild/core";
import {AuthService} from "./auth.service";
import {Entry} from "../models/entry";
import {nanoid} from "nanoid";
import {FormGroup} from "@angular/forms";

@Injectable({
	providedIn: 'root'
})
export class DocService {

	private reloadSubject = new Subject<void>();

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
	private inProgress$ = new Subject<boolean>()

	// TODO vrni samo datoteke prijavljenega uporabnika
	/** userDocs$: Observable<Doc<Entry>[]> = combineLatest([
	 	this.authService.user$,
	 	this.reloadSubject.pipe(startWith(undefined)),
	 ]).pipe(TODO)*/

	constructor(@Inject(AuthService) private readonly authService: AuthService) {
	}

	reload(value?: any) {
		//ts-ignore
		this.reloadSubject.next(value);
	}

	async uploadAndSet(user: User, file: File | undefined, form: FormGroup) {
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
					text: form.value.entry,
					...(url !== undefined && {url}),
				},
			},
		});
	}

	// TODO finish
	async deleteDocAndAsset(user: User, key: string, filePath: string, url: string) {
		await deleteAsset({
			collection: 'images',
			fullPath: filePath
		});


		await deleteDoc<Entry>({
			collection: 'img_descriptions',
			doc: {
				key,
				data: {
					text: '',
					...({url}),
				},
			}
		});
	}
}
