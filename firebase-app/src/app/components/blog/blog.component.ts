import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UploadModalComponent} from "./upload-modal/upload-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs";

export interface DialogData {
	uid: string;
	displayName: string;
}

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
	uid?: string;
	displayName?: string;

	constructor(
		public authService: AuthService,
		private dialog: MatDialog
	) {
	}

	ngOnInit(): void {
		this.authService.user$?.subscribe((user) => {
			if (user) {
				this.uid = user.uid;
				this.displayName = user.displayName;
			}
		})
	}

	openModal() {
		let dialogRef = this.dialog.open(UploadModalComponent, {
			height: '400px',
			width: '600px',
			data: {
				uid: this.uid,
				displayName: this.displayName
			}
		});
		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe();
	}
}
