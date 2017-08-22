import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

import { ContactsService } from '../../providers/contacts-service';


@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  contacts: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public contactsService: ContactsService,
    
  ) {

  }

  ionViewDidLoad() {
    this.contactsService.getAll()
    .then(data=>{
      this.contacts = data;
    })
    .catch(error =>{
      console.error(error);
    });
  }
  
  showAlert(){
    let alert = this.alertCtrl.create({
      title: 'Crear Contacto',
      message: 'Digite informacion de contacto',
      inputs: [
        {
          type: 'text',
          name: 'title',
        },
      ],
      buttons: [
        {
          text: 'Guardar',
          handler: (data)=>{
            this.createContact(data.title);
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: ()=>{
            console.log('cancelar');
          }
        }
      ]
    });
    alert.present();
  }

  showAlertEdit( contact: any, position: number ){
    let alert = this.alertCtrl.create({
      title: 'Crear Contacto',
      message: 'Digite el nuevo contacto',
      inputs: [
        {
          type: 'text',
          name: 'title',
          value: contact.title
        },
      ],
      buttons: [
        {
          text: 'Guardar',
          handler: (data)=>{
            //task.title = data.title;
            let copyContact = Object.assign({}, contact);
            copyContact.title = data.title;
            this.updateContact(copyContact, position);
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: ()=>{
            console.log('cancelar');
          }
        }
      ]
    });
    alert.present();
  }

  showAlertDelete( contact: any, position: number ){
    let alert = this.alertCtrl.create({
      title: '¿Parce estás seguro?',
      message: 'El contacto se eliminara por completo',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log('cancelar');
          }
        },
        {
          text: 'Si, estoy seguro',
          handler: ()=>{
            this.deleteContact(contact, position);
          }
        },
      ]
    });
    alert.present();
  }

  private createContact(title: string){
    let newContact: any = {
      title: title,
      completed: false
    };
    this.contactsService.create(newContact)
    .then(data =>{
      newContact.id = data.id;
      this.contacts.unshift( newContact );
    })
    .catch(error =>{
      console.error(error);
    });
  }

  private updateContact(contact: any, position: number){
    this.contactsService.update(contact)
    .then(data =>{
      this.contacts[position] = contact;
    })
    .catch(error =>{
      console.error(error);
    });
  }

  private deleteContact(contact: any, position: number){
    this.contactsService.delete(contact.id)
    .then(data =>{
      this.contacts.splice(position, 1);
    })
    .catch(error =>{
      console.error(error);
    });
  }



}
