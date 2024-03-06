import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { LoadingCardDirective } from './directives/loading-card.directive';
import { SubsComponent } from './pattern/subs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
	declarations: [
		LoadingCardDirective,
		SubsComponent
	],
	imports: [
		CommonModule,
		UiComponentsModule,
		NgbModule
	],
	exports: [
		UiComponentsModule,
		LoadingCardDirective,
		SubsComponent
	]
})
export class SharedModule {}
