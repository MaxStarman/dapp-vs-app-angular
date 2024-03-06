import { isObservable, Subject } from 'rxjs';
import {
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef,
	Directive,
	Input,
	TemplateRef,
	ViewContainerRef
} from '@angular/core';
import { LoadingCardComponent } from '../ui-components/loading-card/loading-card.component';

@Directive({
	selector: '[loadingCard]',
})
export class LoadingCardDirective {
	loadingFactory!: ComponentFactory<LoadingCardComponent>;
	loadingComponent!: ComponentRef<LoadingCardComponent>;

	// Usage
	//<div *vtlLoadingCard="inProgress$"></div>


	@Input()
	set vtlLoadingCard(inProgress$: Subject<boolean>) {
		if (isObservable(inProgress$)) {
			inProgress$.subscribe((data) => {
				this.toggleContent(data);
			});
		} else {
			// Fallback if not observable
			this.toggleContent(inProgress$);
		}
	}

	@Input()
	loadingCardLines = 4;

	constructor(
		private vcRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver,
		private templateRef: TemplateRef<any>
	) {
		this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(
			LoadingCardComponent
		);
	}

	toggleContent(inProgress: boolean): void {
		this.vcRef.clear();
		if (inProgress) {
			// create and embed an instance of the loading component
			this.loadingComponent = this.vcRef.createComponent(this.loadingFactory);
			this.loadingComponent.instance.lines = this.loadingCardLines;
		} else {
			// embed the contents of the host template
			this.vcRef.createEmbeddedView(this.templateRef);
		}
	}
}
