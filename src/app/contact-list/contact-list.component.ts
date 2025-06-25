import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // Nécessaire pour la directive [(ngModel)]
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';


@Component({
  selector: 'app-contact-list',
  standalone: true, // pour les imports (pas de app.modules.ts)
  imports: [
    MatInputModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})


export class ContactListComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: ContactService) { }

  contacts: Contact[] = [];
  listeContactFiltre: Contact[] = [];
  rechercheNom: string = '';
  nombreContacts: number = 0;

  ngOnInit(): void {
    // pour la récup des contacts au chargement
    this.service.getContacts().subscribe(data => {
      this.contacts = data;
      this.listeContactFiltre = [...this.contacts];
      this.nombreContacts = this.contacts.length;
    });
  }



  filtrerContacts() {
    const f = this.rechercheNom.toLowerCase();
    this.listeContactFiltre = this.contacts.filter(c => c.nom.toLowerCase().startsWith(f) || c.prenom.toLowerCase().startsWith(f))
  }

    /* Autre méthode pour filtrer
  filtrerContacts() {
    this.listeContactFiltre = [];
    for (let i = 0; i < this.contacts.length; i++) {
      const contact = this.contacts[i];
      const nomRech = contact.nom.toUpperCase().startsWith(this.rechercheNom.toUpperCase());
      const prenomRech = contact.prenom.toUpperCase().startsWith(this.rechercheNom.toUpperCase()); // par ex : Cela vérifie si la chaîne "SARAH" commence par la chaîne "SA".

      if (nomRech || prenomRech) {
        this.listeContactFiltre.push(contact);
      }
    }
  }
*/

  sendEmail(id: number) {
    const index = this.contacts.findIndex(item => item.id == id);
    window.location.href = `mailto:${this.contacts[index].email}`;
    console.log(this.contacts[index].email)

  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteContact(id); 
      } else if (result === false) {
        console.log('L\'utilisateur a annulé');
      } else {
        console.log('La boîte de dialogue a été fermée sans action explicite');
      }
    });

  }

  deleteContact(id: number) {
    this.service.deleteContact(id).subscribe(() => {
      // pour trouver l’index dans le tableau complet
      const index = this.contacts.findIndex(contact => contact.id === id);
      this.contacts.splice(index, 1); // méthode splice appliquée sur tableau

      // pour supprimer aussi dans la liste filtrée (car elle est affichée)
      const indexFiltre = this.listeContactFiltre.findIndex(contact => contact.id === id);
      this.listeContactFiltre.splice(indexFiltre, 1); 


      // pour mettre à jour le compteur
      this.nombreContacts = this.contacts.length;

    })
  };

    /* Autre méthode pour la suppression
  deleteContact(id: number) {
    this.service.deleteContact(id).subscribe(() => {
      // pour la mise à jour locale après suppression côté "API"
      this.contacts = this.contacts.filter(item => item.id !== id);
      this.filtrerContacts();
      this.nombreContacts = this.contacts.length;
    });}
*/



}







