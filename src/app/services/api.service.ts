import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})


export class ApiService implements InMemoryDbService  {

  
    constructor() { }
  
    createDb() {

const contacts: Contact[] = [
  { id: 1, image:"assets/koala.jpg", nom: "Chang", prenom: "Peihsin", email: "user@example.com", tel:"1234"},
  { id: 2, image:"assets/koala.jpg", nom: "BH", prenom: "Sarah", email: "user2@example.com",tel:"2345"}
];
      return {
        contacts};
    }
  }
  