import { AboutComponent } from './components/about/about.component';
import { FormComponent } from './components/formUtils/form/form.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: 'home', component: FormComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'about', component: AboutComponent }
];