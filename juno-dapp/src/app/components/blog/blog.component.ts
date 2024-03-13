import {Component, Inject, OnInit} from '@angular/core';
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

	constructor(
		@Inject(AuthService) private authService: AuthService,
		@Inject(MatDialog) private dialog: MatDialog,
		@Inject(DocService) private docService: DocService,
		public modalService: NgbModal
	) {
	}

	ngOnInit(): void {
		// TODO get user
		this.userId = this.authService.userId
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
