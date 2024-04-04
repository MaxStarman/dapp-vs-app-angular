// auth.guard.ts
import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable({
	providedIn: 'root'
})
//TODO maybe could be done with firebase AuthGuard
export class AuthGuard implements CanActivate {

	constructor(@Inject(AuthService) private readonly authService: AuthService,
				private router: Router) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		// todo
		return true;
	}
}
