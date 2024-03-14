// auth.guard.ts
import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(@Inject(AuthService) private readonly authService: AuthService,
				private router: Router) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		return this.authService.signedIn$.pipe(
			map((signedIn) => {
				if (signedIn) {
					return true; // Allow navigation to /blog
				} else {
					// If not signed in, redirect to login page or another route
					this.router.navigate(['/home']);
					return false;
				}
			})
		);
	}
}
