import {Injectable} from '@angular/core';
import {Item} from '../models/items.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  items: Item[] = [];
  itemsSubject = new Subject<Item[]>();

  constructor() {
    this.getItems();
  }

  // méthode pour pouvoir acceder la liste des items
  emitItems() {
    this.itemsSubject.next(this.items);
  }

  saveItems() {
    firebase.database().ref('/items').set(this.items);
  }

// récupérer la liste entière des items

  getItems() {
    firebase.database().ref('/items')
      .on('value', (data) => {
        this.items = data.val() ? data.val() : [];
        this.emitItems();
      });
  }

  // recuperer un seul item
  getSingleItems(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/items/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }


  createNewItem(newItem: Item) {
    this.items.push(newItem);
    this.saveItems();
    this.emitItems();
  }

  removeItem(item: Item) {
    const itemIndexToRemove = this.items.findIndex(
      (itemEl) => {
        if (itemEl === item) {
          return true;
        }
      }
    );
    this.items.splice(itemIndexToRemove, 1);
    console.log(this.items.splice(itemIndexToRemove, 1));
    this.saveItems();
    this.emitItems();
  }


}
