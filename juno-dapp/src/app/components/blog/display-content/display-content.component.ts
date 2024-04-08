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

	readonly displayedColumns: string[] = ['creator', 'text', 'url'];

	readonly allDocs$: Observable<Doc<Entry>[]> = this.docService.allDocs$;

	readonly myDocs$: Observable<Doc<Entry>[]> = this.docService.myDocs$;

	inProgress$: boolean = false

	delDoc?: Doc<Entry>;

	constructor(
		public authService: AuthService,
		private docService: DocService,
		private snackBar: MatSnackBar
	) {
	}

	ngOnInit() {
		this.docService.inProgress$.subscribe(progress => {
			this.inProgress$ = progress.valueOf()
		})
	}

	deleteEntry(doc: Doc<Entry>) {
		this.docService.inProgress$.next(true);
		this.delDoc = doc;
		const imageUrl = doc.data.url;
		const imagePath = imageUrl.replace("https://cw5ba-ciaaa-aaaal-advla-cai.icp0.io", "");

		this.docService.deleteDocAndAsset(doc, imagePath, false).then(() => {
			this.docService.inProgress$.next(false);
			this.delDoc = undefined;
			this.snackBar.open('Success!', 'Dismiss', {
					duration: 3000
				}
			);
		})

	}
}
