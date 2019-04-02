import {Component, OnInit, OnDestroy} from '@angular/core';
import {Item} from '../models/items.model';
import {Subscription} from 'rxjs';
import {ItemsService} from '../services/items.service';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {BasketService} from '../services/basket.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {

  items: Item[];
  itemForm: FormGroup;
  itemsSubscription: Subscription;

  constructor(private itemsService: ItemsService,
              private basketsService: BasketService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.itemsSubscription = this.itemsService.itemsSubject.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
    this.itemsService.emitItems();
    this.initForm();
  }

  initForm() {
    this.itemForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onNewItem() {
    this.router.navigate(['/items', 'new']);
  }

  onDeleteItem(item: Item) {
    this.itemsService.removeItem(item);
  }

  onPushBasket(newBasket) {
    this.basketsService.addBasket(newBasket);
    this.router.navigate(['/basket']);
  }

  onViewItem(id: number) {
    this.router.navigate(['/items', 'view', id]);
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }
}
