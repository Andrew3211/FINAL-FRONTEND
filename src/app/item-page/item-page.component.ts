import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Collection, CustomItemFields, Item} from '../entity-classes/entity-classes.component';
import {CollectionService} from '../collection-service';
import {AppService} from '../app-service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  loadedItemList: Item[];
  indexForDelete: number;
  index = 0;
  constructor(public collectionService: CollectionService, private appService: AppService, public http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (this.appService.curUser == null) { this.router.navigate(['/']); }
    this.collectionService.tmpItem = new Item();
    this.collectionService.tmpCustomItemFields = this.collectionService.tmpCollection.customItemFields;
    this.getCollectionsItem();
    console.log();
  }
  getCollectionsItem(): void {
    console.log(this.collectionService.tmpCollection);
    console.log(this.collectionService.tmpCustomItemFields);
    this.http.get<Item[]>(`http://82.202.173.178:8080/getItemList/${this.collectionService.tmpCollection.collectionID}`).subscribe(
      (itemList: Item[]) => {
        console.log(itemList);
        console.log(this.collectionService.tmpCustomItemFields);
        this.loadedItemList = itemList;
      });
  }
  deleteItem(): void {
    this.http.post<Item>('http://82.202.173.178:8080/deleteItem', this.collectionService.tmpItem).subscribe(
      res => {
        if (res) {
          this.loadedItemList.forEach((value, index) => {
            if (value.itemID === this.collectionService.tmpItem.itemID) {
              this.indexForDelete = index;
            }
          });
          this.loadedItemList.splice(this.indexForDelete, 1);
        }
        else {
          alert('Deletion failed. Try repeat again');
        }
      });
    this.getCollectionsItem();
  }
  saveItem(): void {
    this.http.post<Item>('http://82.202.173.178:8080/saveNewItemValues', this.collectionService.tmpItem).subscribe(
      item => {
        if (item) {
          this.collectionService.tmpItem = item;
        }
        else {
          alert('Update failed. Try repeat again');
        }
      });
  }
}
