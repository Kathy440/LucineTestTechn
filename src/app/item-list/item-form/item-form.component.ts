import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/items.model';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  itemForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private itemsService: ItemsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.itemForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSaveItem() {
    const title = this.itemForm.get('title').value;
    const description = this.itemForm.get('description').value;
    const newItem = new Item(title, description);

    this.itemsService.createNewItem(newItem);
    this.router.navigate(['/items']);
  }

}
