import { Component } from '@angular/core';
import { Database, set, ref, update, onValue, remove } from '@angular/fire/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  items: any[] = [];
  editMode: boolean = false;
  editItemData: any = {};
  editItemIndex: number | null = null;

  constructor (public database: Database) {

  }

  addItem(value: any) {
    const newItem = {
      itemname: value.itemname,
      grocery: value.grocery,
      description: value.description
    };

    this.items.push(newItem);
    value.reset();

    value.itemname = '';
    value.grocery = '';
    value.description = '';

    set(ref(this.database, 'items/' + newItem.itemname), newItem);

    alert('Item added to the list!');
  }

  editItem(index: number) {
    this.editMode = true;
    this.editItemIndex = index;
    this.editItemData = { ...this.items[index] };
  }

  updateItem(value: any) {
    if (this.editItemIndex !== null) {
      this.items[this.editItemIndex] = value;
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.editItemData = {};
    this.editItemIndex = null;
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }
}

