import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {DocService} from "../../../services/doc.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: 'upload-modal',
	templateUrl: './upload-modal.component.html',
	styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {

	uploadForm = this.formBuilder.group({
		text: ['', Validators.required],
		fileInput: ['', Validators.required]
	});

	inProgress$: boolean = false;

	file: File | undefined;

	constructor(
		private dialogRef: MatDialogRef<UploadModalComponent>,
		private docService: DocService,
		private formBuilder: FormBuilder,
		public snackBar: MatSnackBar
	) {
	}

	ngOnInit() {
		this.docService.inProgressUpload$.subscribe(progress => {
			this.inProgress$ = progress.valueOf()
		})
	}

	async onSubmit() {
		if (this.uploadForm.valid) {
			this.docService.inProgressUpload$.next(true);
			this.uploadForm.disable()
			this.docService.uploadAndSetEntry(this.file, this.uploadForm.value.text!).then((res) => {
				this.closeModal('Save clicked')
				this.docService.inProgressUpload$.next(false)
				this.snackBar.open('Success!', 'Dismiss', {
					duration: 3000
				});
			}).catch((err) => {
				console.error(err)

				this.snackBar.open('Error', 'Dismiss', {
					panelClass: ['error'],
					duration: 3000
				});
				this.uploadForm.enable();
			})
		}
	}

	async onFileSelected($event: Event) {
		const target = $event.target as HTMLInputElement;
		this.file = target.files?.[0];
	}

	closeModal(result?: string) {
		this.dialogRef.close(result)
	}

}
