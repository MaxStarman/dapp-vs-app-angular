import {Component, Inject} from '@angular/core';
import {Entry} from "../../../models/entry";
import {Doc} from "@junobuild/core";
import {Observable} from "rxjs";
import {DocService} from "../../../services/doc.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
	selector: 'display-content',
	templateUrl: './display-content.component.html',
	styleUrls: ['./display-content.component.scss']
})
export class DisplayContentComponent {

	readonly displayedColumns: string[] = ['creator', 'text', 'url'];

	readonly allDocs$: Observable<Doc<Entry>[]> = this.docService.allDocs$;

	readonly myDocs$: Observable<Doc<Entry>[]> = this.docService.myDocs$;

	constructor(@Inject(DocService) private readonly docService: DocService,
				private snackBar: MatSnackBar) {
	}

	// TODO navedn user brise samo svoje (My tab), admin lahko vse (All tab)
	deleteEntry(doc: Doc<Entry>) {
		const imageUrl = doc.data.url;
		const imagePath = imageUrl.replace("https://cw5ba-ciaaa-aaaal-advla-cai.icp0.io", "");

		this.docService.deleteDocAndAsset(doc, imagePath, false).then(() => {
			this.snackBar.open('Success!', 'Dismiss', {
				duration: 3000
			});
		})

	}
}
