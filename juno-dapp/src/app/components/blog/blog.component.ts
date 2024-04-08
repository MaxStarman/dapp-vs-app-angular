import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UploadModalComponent} from "./upload-modal/upload-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {DocService} from "../../services/doc.service";
import {take} from "rxjs";

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

	username?: string
	userId?: string

	readonly singedIn$ = this.authService.signedIn$

	constructor(
		public authService: AuthService,
		private dialog: MatDialog,
		private docService: DocService,
		public modalService: NgbModal
	) {
	}

	ngOnInit(): void {
		this.userId = this.authService.userId
		this.username = this.authService.username$.value
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
