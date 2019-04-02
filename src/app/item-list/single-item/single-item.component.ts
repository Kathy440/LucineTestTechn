import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/models/items.model';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {

  item: Item;

  constructor(private route: ActivatedRoute,
              private itemsService: ItemsService,
              private router: Router) { }

  ngOnInit() {
    this.item = new Item('', '');
    const id = this.route.snapshot.params['id'];
    this.itemsService.getSingleItems(+id).then(
      (item: Item) => {
        this.item = item;
      }
    );
  }

  onBack() {
    this.router.navigate(['/items']);
  }

}
