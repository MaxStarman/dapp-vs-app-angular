import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
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

	inProgress$: boolean = true;

	private file: File | undefined;

	constructor(
		private dialogRef: MatDialogRef<UploadModalComponent>,
		private authService: AuthService,
		private formBuilder: FormBuilder,
		public snackBar: MatSnackBar
	) {
	}

	ngOnInit() {
		//TODO subscribe to inProgress Behaviour subject
	}

	async onSubmit() {
		if (this.uploadForm.valid) {
			alert('TODO')
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
