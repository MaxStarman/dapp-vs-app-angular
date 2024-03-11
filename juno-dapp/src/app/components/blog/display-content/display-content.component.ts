import {Component, Inject} from '@angular/core';
import {Entry} from "../../../models/entry";
import {Doc} from "@junobuild/core";
import {Observable} from "rxjs";
import {DocService} from "../../../services/doc.service";

@Component({
	selector: 'display-content',
	templateUrl: './display-content.component.html',
	styleUrls: ['./display-content.component.scss']
})
export class DisplayContentComponent {

	readonly displayedColumns: string[] = ['creator', 'text', 'url'];

	readonly allDocs$: Observable<Doc<Entry>[]> = this.docService.allDocs$;

	readonly myDocs$: Observable<Doc<Entry>[]> = this.docService.myDocs$;

	constructor(@Inject(DocService) private readonly docService: DocService) {
	}

	// TODO navedn user rise samo svoje, admin lahko vse
	deleteImg() {
		alert('TODO')
	}
}
