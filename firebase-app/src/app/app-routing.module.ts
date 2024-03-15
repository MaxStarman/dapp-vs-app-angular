import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from "./components/blog/blog.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'blog', component: BlogComponent, canActivate: [AuthGuard]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
