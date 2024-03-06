import { Component, Inject, Input } from '@angular/core';
import { User } from '../../classes/user';
import { SubsComponent } from '../../shared/pattern/subs.component';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends SubsComponent {

	// @Input()
	// user: User

	user: any
	constructor(@Inject(AuthService) private authService: AuthService,) {
		super();
		this.user = this.authService.user$.subscribe()
	}

	addDocument(){
		alert('TODO')
	}

	klik(){
		console.log(this.user)
	}
}
