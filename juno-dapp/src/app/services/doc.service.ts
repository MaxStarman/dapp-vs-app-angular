import {Inject, Injectable} from '@angular/core';
import {combineLatest, from, map, Observable, of, shareReplay, startWith, Subject, switchMap} from "rxjs";
import {Doc, listDocs, setDoc, uploadFile, User} from "@junobuild/core";
import {AuthService} from "./auth.service";
import {Entry} from "../models/entry";
import {nanoid} from "nanoid";
import {FormGroup} from "@angular/forms";

@Injectable({
	providedIn: 'root'
})
export class DocService {
	private reloadSubject = new Subject<void>();

	docs$: Observable<Doc<Entry>[]> = combineLatest([
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
					filter: {},
				})
			).pipe(map(({items}) => items));
		}),
		startWith([]),
		shareReplay({bufferSize: 1, refCount: true})
	);

	constructor(@Inject(AuthService) private readonly authService: AuthService) {
	}

	reload() {
		this.reloadSubject.next();
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
}
