import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';


@Injectable({
  providedIn: 'root'
})

export class ContactService {


  private apiURL = "api/contacts"; // il faut mettre la propriété contacts de contacts : this.listeContact (api.service)

  constructor(private http : HttpClient) { }



  addContact(obj : Contact) {
    return this.http.post<Contact>(this.apiURL, obj);
  }


  getContacts() {
    return this.http.get<Contact[]>(this.apiURL);
  }

  getContact(id:number) {
    return this.http.get<Contact>(this.apiURL+"/"+id);
  }


  updateContact(obj : Contact) {
     return this.http.put<Contact>(this.apiURL+"/"+obj.id, obj);
  }

  deleteContact(id:number) {
    return this.http.delete(this.apiURL+"/"+id)
  }

}
