import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

/*
  Generated class for the ContactsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ContactsService {
  contacts: string[] = [
  ];
  constructor(public http: Http) {
    console.log('Hello ContactsService Provider');
  }


  getAll(){
    return this.http.get('https://randomuser.me/api/?results=50')
    .map(response => response.json())
    .toPromise();
  }

  /*checkUsername(username: string){
     return this.contacts.indexOf(username);
  }*/

  /*getAll(){
    return this.http.get(this.contacts)
    .map(response => response.json())
    .toPromise();
  }*/

  create(contact: any){
    let body = JSON.stringify(contact);
    return this.http.post(this.contacts, body)
    .map(response => response.json())
    .toPromise();
  }

  update(contact: any){
    let body = JSON.stringify(contact);
    //this.http.put(this.url+ '/' + task.id, body)
    return this.http.put(`${this.contacts}/${contact.id}`,body)
    .map(response => response.json())
    .toPromise();
  }

  delete(id: number){
    return this.http.delete(`${this.contacts}/${id}`)
    .map(response => response.json())
    .toPromise();
  }
  
}
