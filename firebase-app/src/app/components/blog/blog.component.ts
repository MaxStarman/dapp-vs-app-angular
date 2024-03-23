import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UploadModalComponent} from "./upload-modal/upload-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

	username?: string
	userId?: string

	readonly singedIn$ = this.authService.signedIn$;

	constructor(
		@Inject(AuthService) private authService: AuthService,
		@Inject(MatDialog) private dialog: MatDialog,
		public modalService: NgbModal
	) {
	}

	ngOnInit(): void {
		this.authService.userId.subscribe(uid => {
			this.userId = uid
		})
		this.username = 'username'
	}

	openModal() {
		let dialogRef = this.dialog.open(UploadModalComponent, {
			height: '400px',
			width: '600px',
		});

		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				// TODO reload documents
			});
	}
}
