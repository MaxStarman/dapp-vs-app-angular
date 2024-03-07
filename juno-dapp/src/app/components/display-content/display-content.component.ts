import {Component, Inject} from '@angular/core';
import {Entry} from "../../models/entry";
import {Doc} from "@junobuild/core";
import {Observable} from "rxjs";
import {DocService} from "../../services/doc.service";

@Component({
	selector: 'display-content',
	templateUrl: './display-content.component.html',
	styleUrls: ['./display-content.component.scss']
})
export class DisplayContentComponent {

	readonly displayedColumns: string[] = ['key', 'text', 'url'];

	readonly docs$: Observable<Doc<Entry>[]> = this.docService.docs$;

	constructor(@Inject(DocService) private readonly docService: DocService) {
	}

	deleteImg() {
		alert('TODO')
	}
}
