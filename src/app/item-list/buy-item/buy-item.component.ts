import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/items.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {BasketService} from '../../services/basket.service';
import {Basket} from '../../models/baskets.models';

@Component({
  selector: 'app-buy-item',
  templateUrl: './buy-item.component.html',
  styleUrls: ['./buy-item.component.scss']
})
export class BuyItemComponent implements OnInit {

  basket: Basket;
  baskets: Basket[];
  basketsSubscription: Subscription;

  constructor(private basketsService: BasketService,
              private router: Router) { }

  ngOnInit() {
    this.basket = new Item('', '');
    this.basketsSubscription = this.basketsService.basketSubject.subscribe(
      (basket: Basket[]) => {
        this.baskets = basket;
      }
    );
    this.basketsService.emitBasket();
    this.initForm();
  }

  initForm() {
  }
  onBack() {
    this.router.navigate(['/items']);
  }

  onDeleteBasket(basket: Basket) {
    this.basketsService.removeItem(basket);
  }


  onValideBasket() {
    alert('Voulez vous vraiment valider votre panier ?');
    this.router.navigate(['/items']);
  }

}
