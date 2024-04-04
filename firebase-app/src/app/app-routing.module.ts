import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from "./components/blog/blog.component";
import {HomeComponent} from "./components/home/home.component";
import {redirectLoggedInTo} from "@angular/fire/auth-guard";
import {AuthGuard} from "./auth.guard";

const redirectLoggedInToBlog = () => redirectLoggedInTo(['blog']);

const routes: Routes = [
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'blog', component: BlogComponent, canActivate: [AuthGuard]}
];

// canActivate: [AuthGuard], data: {redirectLoggedInToBlog}
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
