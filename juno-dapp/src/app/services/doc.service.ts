import {Injectable} from '@angular/core';
import {
	BehaviorSubject,
	combineLatest,
	from,
	map,
	Observable,
	of,
	shareReplay,
	startWith,
	Subject,
	switchMap
} from "rxjs";
import {deleteAsset, deleteDoc, Doc, listDocs, setDoc, uploadFile} from "@junobuild/core";
import {AuthService} from "./auth.service";
import {Entry} from "../models/entry";
import {nanoid} from "nanoid";

@Injectable({
	providedIn: 'root'
})
export class DocService {

	inProgressUpload$ = new BehaviorSubject<boolean>(false)
	inProgressDelete$ = new BehaviorSubject<boolean>(false)

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
	// Return all documents for logged-in user
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

	constructor(private authService: AuthService) {
	}

	reload(value?: any) {
		//ts-ignore
		this.reloadSubject.next(value);
	}

	async uploadAndSetEntry(file: File | undefined, text: string) {
		const key = nanoid();

		if (file !== undefined) {
			const filename = `${Date.now()}_${file.name}`;

			const {downloadUrl} = await uploadFile({
				collection: 'images',
				data: file,
				filename,
			})

			await setDoc({
				collection: 'img_descriptions',
				doc: {
					key,
					data: {
						text: text,
						url: downloadUrl
					},
				},
			});
		}
	}

	async deleteDocAndAsset(doc: Doc<Entry>, imgFullPath: string) {
		await deleteDoc<Entry>({
			collection: 'img_descriptions',
			doc: doc
		}).then(() => {
			deleteAsset({
				collection: 'images',
				fullPath: imgFullPath
			});

		});
		this.reload()
	}
}
