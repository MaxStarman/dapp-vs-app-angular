import {Component, OnInit} from '@angular/core';
import {Entry} from "../../../models/entry";
import {Doc} from "@junobuild/core";
import {Observable} from "rxjs";
import {DocService} from "../../../services/doc.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../services/auth.service";

@Component({
	selector: 'display-content',
	templateUrl: './display-content.component.html',
	styleUrls: ['./display-content.component.scss']
})
export class DisplayContentComponent implements OnInit {

	readonly displayedColumnsMyDocs: string[] = ['text', 'url'];
	readonly displayedColumnsAllDocs: string[] = ['creator', 'text', 'url'];

	readonly allDocs$: Observable<Doc<Entry>[]> = this.docService.allDocs$;

	readonly myDocs$: Observable<Doc<Entry>[]> = this.docService.myDocs$;

	inProgress$: boolean = false


	constructor(
		public authService: AuthService,
		private docService: DocService,
		private snackBar: MatSnackBar
	) {
	}

	ngOnInit() {
		this.docService.inProgressDelete$.subscribe(progress => {
			this.inProgress$ = progress.valueOf()
		})
	}

	deleteEntry(doc: Doc<Entry>) {
		this.docService.inProgressDelete$.next(true);
		const imageUrl = doc.data.url;
		const imagePath = imageUrl.replace("https://cw5ba-ciaaa-aaaal-advla-cai.icp0.io", "");

		this.docService.deleteDocAndAsset(doc, imagePath).then(() => {
			this.docService.inProgressDelete$.next(false);
			this.snackBar.open('Success!', 'Dismiss', {
					duration: 3000
				}
			);
		}).catch((err) => {
			console.error(err);
			this.docService.inProgressDelete$.next(false);
		})

	}
}
