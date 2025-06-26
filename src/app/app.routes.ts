import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

export const routes: Routes = [

    {
        path:'dashboard', 
        component: DashboardComponent, 
        title: 'Dashboard',
        data:{isMenu: true} // pour qu'il apparaisse dans le menu de gauche
    },

    {
        path:'', 
        component: ContactListComponent,
        title: 'Contact',
        data:{isMenu: true} // pour qu'il apparaisse dans le menu de gauche
    },

    {
        path: 'contactdetails/:id',
        loadComponent: () =>
          import('./contact-details/contact-details.component').then(m => m.ContactDetailsComponent), // REVOIR
        title: 'Détails contact'
    }

];
