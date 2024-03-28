import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UploadModalComponent} from "./upload-modal/upload-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";

export interface DialogData {
	uid: string;
	username: string;
}

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

	username?: string | null | undefined;
	userId?: string;

	readonly singedIn$ = this.authService.signedIn$;

	inProgress = true;

	constructor(
		private authService: AuthService,
		@Inject(MatDialog) private dialog: MatDialog,
		public modalService: NgbModal
	) {
	}

	// TODO dodaj nek loading card oz. nek inProgress
	ngOnInit(): void {
		this.authService.currentUser.subscribe((user) => {
			if (user) {
				this.inProgress = false;
				this.userId = user?.uid
				this.username = user?.displayName
			}
		})
	}

	openModal() {
		let dialogRef = this.dialog.open(UploadModalComponent, {
			height: '400px',
			width: '600px',
			data: {
				uid: this.userId,
				username: this.username
			}
		});

		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe();
	}
}
