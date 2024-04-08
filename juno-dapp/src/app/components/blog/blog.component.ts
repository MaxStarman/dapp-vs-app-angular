import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UploadModalComponent} from "./upload-modal/upload-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {DocService} from "../../services/doc.service";
import {take} from "rxjs";

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

	constructor(
		public authService: AuthService,
		private dialog: MatDialog,
		private docService: DocService
	) {
	}

	openModal() {
		let dialogRef = this.dialog.open(UploadModalComponent, {
			height: '400px',
			width: '600px',
		});

		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => this.docService.reload());
	}
}
