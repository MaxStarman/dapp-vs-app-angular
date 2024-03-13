import {Component} from '@angular/core';
import {User} from "@junobuild/core";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder} from "@angular/forms";
import {catchError, filter, from, NEVER, switchMap, take} from "rxjs";
import {DocService} from "../../../services/doc.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: 'upload-modal',
	templateUrl: './upload-modal.component.html',
	styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent {

	uploadForm = this.formBuilder.group({
		entry: '',
	});

	private file: File | undefined;

	constructor(
		private dialogRef: MatDialogRef<UploadModalComponent>,
		private authService: AuthService,
		private docService: DocService,
		private formBuilder: FormBuilder,
		public snackBar: MatSnackBar
	) {
	}

// TODO get username from session storage
	async onSubmit() {
		this.uploadForm.disable()
		this.authService.user$
			.pipe(
				filter((user) => user !== null),
				switchMap((user) => from(this.docService.uploadAndSetEntry(user as User, this.file, this.uploadForm, 'username'))),
				take(1),
				catchError((err: unknown) => {
					console.error(err);

					this.snackBar.open('Error', 'Dismiss', {
						panelClass: ['error'],
					});

					this.uploadForm.enable();
					return NEVER;
				})
			)
			.subscribe(() => {
				this.closeModal('Save clicked')

				this.snackBar.open('Success!', 'Dismiss');
			});
	}

	async onFileChanged($event: Event) {
		const target = $event.target as HTMLInputElement;
		this.file = target.files?.[0];
	}

	closeModal(result?: string) {
		this.dialogRef.close(result)
	}


}
