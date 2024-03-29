import {Component, Input, OnInit} from '@angular/core';
import {Entry} from "../../../models/entry";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DocsService} from "../../../services/docs.service";
import {Observable} from "rxjs";
import {FireDoc} from "../../../models/fireDoc";

@Component({
	selector: 'display-content',
	templateUrl: './display-content.component.html',
	styleUrls: ['./display-content.component.scss']
})
export class DisplayContentComponent implements OnInit {

	@Input()
	uid?: string;

	readonly displayedColumns: string[] = ['creator', 'text']; // later add url

	allDocs$ = this.docService.getAllDocsObservable();

	myDocs$ = new Observable<any>();

	inProgress$: boolean = false

	delDoc?: Entry;

	constructor(private docService: DocsService,
				private snackBar: MatSnackBar) {
	}

	ngOnInit() {
		// TODO optimize uid
		this.myDocs$ = this.docService.getMyDocsObservable(this.uid)

	}


	// TODO naveden user brise samo svoje (My tab), admin lahko vse (All tab)
	deleteEntry(doc: FireDoc) {
		this.docService.deleteDoc(doc.id).then(() => {
			this.snackBar.open('Document deleted', 'OK', {
				duration: 5000
			})
		})
	}
}
