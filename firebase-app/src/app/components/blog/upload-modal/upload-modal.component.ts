import {Component, Inject} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DocService} from "../../../services/doc.service";
import {DialogData} from "../blog.component";

@Component({
	selector: 'upload-modal',
	templateUrl: './upload-modal.component.html',
	styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent {

	uploadForm = this.formBuilder.group({
		text: ['', Validators.required],
		fileInput: ['', Validators.required]
	});

	file: File | undefined;

	constructor(
		private dialogRef: MatDialogRef<UploadModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public docsService: DocService,
		private formBuilder: FormBuilder,
		public snackBar: MatSnackBar
	) {
	}

	async onSubmit() {
		if (this.uploadForm.valid) {
			this.docsService.uploadFileAndCreateDoc(
				{
					uid: this.data.uid,
					creator: this.data.displayName,
					text: this.uploadForm.value.text!
				},
				this.file!).subscribe({
					complete: () => {
						this.closeModal();
						this.snackBar.open('Success', "OK", {
							duration: 5000
						});
					},
					error: (error) => {
						this.snackBar.open('Error', 'Dismiss', {
							panelClass: ['error'],
							duration: 5000
						});
					}
				}
			)
		}
	}

	closeModal(result?: string) {
		this.dialogRef.close(result)
	}

	async onFileSelected($event: Event) {
		const target = $event.target as HTMLInputElement;
		this.file = target.files?.[0];
	}
}
