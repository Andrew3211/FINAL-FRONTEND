import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app-service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CollectionService} from '../collection-service';
import {Collection, CustomItemFields, Item, User} from '../entity-classes/entity-classes.component';

@Component({
  selector: 'app-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.css']
})
export class AddItemPageComponent implements OnInit {

  constructor(public collectionService: CollectionService, private appService: AppService, public http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (this.appService.curUser == null) { this.router.navigate(['/']); }
    this.collectionService.tmpItem = new Item();
    this.collectionService.tmpCustomItemFields = new CustomItemFields();
    this.collectionService.tmpItem.setNulls();
    this.collectionService.tmpCustomItemFields.setNulls();
    this.getUserCollections();
  }
  saveItem(): void {
    this.http.post<boolean>(`http://82.202.173.178:8080/saveNewItem/${this.collectionService.tmpCollection.collectionID}`, this.collectionService.tmpItem).subscribe(
      res => {
        if (res) {
          this.router.navigate(['/collection-page']);
        }else {
          alert('Error. Data was not saved!');
        }
      });
  }
  getUserCollections(): void {
    this.http.get<Collection>(`http://82.202.173.178:8080/getCurCollection/${this.collectionService.tmpCollection.collectionID}`).subscribe(
      collection => {
        this.collectionService.tmpCollection.collectionID = collection.collectionID;
        this.collectionService.tmpCollection.name = collection.name;
        this.collectionService.tmpCollection.description = collection.description;
        this.collectionService.tmpCollection.theme = collection.theme;
        this.collectionService.tmpCollection.colImg = collection.colImg;
        this.collectionService.tmpCollection.dateOfCreation = collection.dateOfCreation;
        this.collectionService.tmpCustomItemFields = collection.customItemFields;
        this.collectionService.tmpCollection.usingCustomFields = collection.usingCustomFields;
      });
  }
}
