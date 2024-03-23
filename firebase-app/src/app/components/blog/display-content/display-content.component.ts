import {Component, OnInit} from '@angular/core';
import {Entry} from "../../../models/entry";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DocsService} from "../../../services/docs.service";

@Component({
	selector: 'display-content',
	templateUrl: './display-content.component.html',
	styleUrls: ['./display-content.component.scss']
})
export class DisplayContentComponent implements OnInit {

	readonly displayedColumns: string[] = ['creator', 'text', 'url'];

	allDocs$ = this.docService.getAllDocs();
	myDocs$ = []

	inProgress$: boolean = false

	delDoc?: Entry;

	constructor(private docService: DocsService,
				private snackBar: MatSnackBar) {
	}

	ngOnInit() {
		//TODO subscribe to inProgress Behaviour subject
	}

	// TODO naveden user brise samo svoje (My tab), admin lahko vse (All tab)
	deleteEntry(doc: any) {
		alert('TODO')
	}
}
