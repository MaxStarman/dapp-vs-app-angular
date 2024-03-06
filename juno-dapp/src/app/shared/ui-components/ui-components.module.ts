import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LoadingCardComponent } from './loading-card/loading-card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
	imports: [
		CommonModule,
		NgxSkeletonLoaderModule
	],
	declarations: [
		ButtonComponent,
		LoadingCardComponent
	],
	exports: [
		ButtonComponent,
		LoadingCardComponent
	]
})
export class UiComponentsModule { }

