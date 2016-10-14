import { Component } from '@angular/core';
import {SearchPage} from '../search/search'
import {ListPage} from '../list/list'
import {NotificationsPage} from '../notifications/notifications'
import {HistoryPage} from '../history/history'
import {ItsMePage} from '../its-me/its-me'



@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;
  private tab5Root: any;
  

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = SearchPage;
    this.tab2Root = ListPage;
    this.tab3Root = NotificationsPage;
    this.tab4Root = HistoryPage;
    this.tab5Root = ItsMePage;
    
  }
}
