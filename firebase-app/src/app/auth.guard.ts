// auth.guard.ts
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable, take, tap} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable({
	providedIn: 'root'
})

export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService,
				private router: Router) {
	}


	// @ts-ignore
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | null {

		// @ts-ignore
		return this.authService.user$.pipe(
			take(1),
			map(user => !!user), // <-- map to boolean
			tap(loggedIn => {
				if (!loggedIn) {
					console.error('Access denied')
					this.router.navigate(['/'])
				}
			})
		)
	}
}
