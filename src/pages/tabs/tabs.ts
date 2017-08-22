import { Component } from '@angular/core';

import { ContactsPage } from '../contacts/contacts';
import { CategoriesPage } from '../categories/categories';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ContactsPage;
  tab2Root = CategoriesPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
