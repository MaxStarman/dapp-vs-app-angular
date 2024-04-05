import {Component, Inject} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DocsService} from "../../../services/docs.service";
import {DialogData} from "../blog.component";

@Component({
	selector: 'upload-modal',
	templateUrl: './upload-modal.component.html',
	styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent {

	uploadForm = this.formBuilder.group({
		text: ['', Validators.required]
	});

	inProgress$: boolean = false;


	constructor(
		private dialogRef: MatDialogRef<UploadModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private docsService: DocsService,
		private formBuilder: FormBuilder,
		public snackBar: MatSnackBar
	) {
	}

	async onSubmit() {
		if (this.uploadForm.valid) {
			this.formInProgress(true)
			this.docsService.createDoc({
				uid: this.data.uid,
				creator: this.data.displayName,
				text: this.uploadForm.value.text!
			}).then(() => {
				this.formInProgress(false);
				this.closeModal()
				this.snackBar.open('Success', "OK", {
					duration: 5000
				});
			}).catch((err) => {
				this.formInProgress(false)
				this.snackBar.open('Error', 'Dismiss', {
					panelClass: ['error'],
					duration: 5000
				});
			})
		}
	}

	closeModal(result?: string) {
		this.dialogRef.close(result)
	}

	private formInProgress(isInProgress: boolean) {
		this.inProgress$ = isInProgress;
		isInProgress ? this.uploadForm.disable() : this.uploadForm.enable();
	}
}
