import {Component, OnInit} from '@angular/core';
import {User} from "@junobuild/core";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {catchError, filter, from, NEVER, switchMap, take} from "rxjs";
import {DocService} from "../../../services/doc.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: 'upload-modal',
	templateUrl: './upload-modal.component.html',
	styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {

	uploadForm = this.formBuilder.group({
		entry: '',
		fileInput: ['', Validators.required]
	});

	inProgress$: boolean = false;

	private file: File | undefined;

	constructor(
		private dialogRef: MatDialogRef<UploadModalComponent>,
		private authService: AuthService,
		private docService: DocService,
		private formBuilder: FormBuilder,
		public snackBar: MatSnackBar
	) {
	}

	ngOnInit() {
		this.docService.inProgress$.subscribe(progress => {
			this.inProgress$ = progress.valueOf()
		})
	}

	async onSubmit() {
		if (this.uploadForm.valid) {
			this.docService.inProgress$.next(true);
			this.uploadForm.disable()
			this.authService.currentUser$
				.pipe(
					filter((user) => user !== null),
					switchMap((user) => from(
						this.docService.uploadAndSetEntry(user as User, this.file, this.uploadForm, user!!.data.username))),
					take(1),
					catchError((err: unknown) => {
						console.error(err);

						this.snackBar.open('Error', 'Dismiss', {
							panelClass: ['error'],
							duration: 3000
						});

						this.uploadForm.enable();
						return NEVER;
					})
				)
				.subscribe(() => {
					this.closeModal('Save clicked')
					this.docService.inProgress$.next(false)
					this.snackBar.open('Success!', 'Dismiss', {
						duration: 3000
					});
				});
		}
	}

	async onFileChanged($event: Event) {
		const target = $event.target as HTMLInputElement;
		this.file = target.files?.[0];
	}

	closeModal(result?: string) {
		this.dialogRef.close(result)
	}


}
