import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { HNApi } from '../services/hn-api';
import { HNItem } from '../components/hn-item';

@Component({
  selector: 'page-item',
  injectables: [HNApi],
  directives: [
    HNItem
  ],
  templateUrl: 'app/pages/item.html'
})
export class ItemPage {
  constructor(hnApi: HNApi, routeParams: RouteParams) {
    this.itemId = routeParams.get('id');

    hnApi.fetchItem(this.itemId).then(data => {
      if (data) {
        this.childrenIds = data.kids;
      }
    });
  }
}