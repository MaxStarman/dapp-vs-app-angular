import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
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
	inProgress = true;

	displayName?: string;
	uid?: string;
	admin?: boolean;

	constructor(
		public authService: AuthService,
		private dialog: MatDialog
	) {
	}

	// TODO dodaj nek loading card oz. nek inProgress
	ngOnInit(): void {
		this.authService.user$?.subscribe((user) => {
			if (user) {
				this.uid = user.uid;
				this.displayName = user.displayName;
				this.admin = user.admin
			}
		})
	}

	openModal() {
		let dialogRef = this.dialog.open(UploadModalComponent, {
			height: '400px',
			width: '600px',
			data: {
				uid: this.uid,
				username: this.displayName
			}
		});
		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe();
	}
}
