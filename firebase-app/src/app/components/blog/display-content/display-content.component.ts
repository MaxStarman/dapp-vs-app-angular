import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DocService} from "../../../services/doc.service";
import {Observable} from "rxjs";
import {AuthService} from "../../../services/auth.service";

@Component({
	selector: 'display-content',
	templateUrl: './display-content.component.html',
	styleUrls: ['./display-content.component.scss']
})
export class DisplayContentComponent implements OnInit {

	@Input()
	uid!: string;

	readonly displayedColumns: string[] = ['creator', 'text'];

	allDocs$!: Observable<any>

	myDocs$!: Observable<any>

	inProgress$: boolean = false

	constructor(public docService: DocService,
				private snackBar: MatSnackBar,
				public authService: AuthService) {
	}

	ngOnInit() {
		this.myDocs$ = this.docService.getMyDocsObservable(this.uid)
		this.allDocs$ = this.docService.getAllDocsObservable();
	}

	deleteEntry(doc: any) {
		this.docService.deleteFileAndDoc(doc.id, doc.data.imagePath).then(() => {
			this.snackBar.open('Document deleted', 'OK', {
				duration: 5000
			})
		})
	}
}
