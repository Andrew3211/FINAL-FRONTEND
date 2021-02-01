import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Collection, User} from '../entity-classes/entity-classes.component';
import {CollectionService} from '../collection-service';
import {AppService} from '../app-service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.css']
})
export class CollectionPageComponent implements OnInit {
  @ViewChild('themeSelector', {static: false}) themeSelector: ElementRef;
  loadedColList: Collection[];
  indexForDelete: number;
  constructor(public collectionService: CollectionService, private appService: AppService, public http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (this.appService.curUser == null) { this.router.navigate(['/']); }
    this.collectionService.tmpCollection = null;
    this.getUserCollections();
  }
  getUserCollections(): void {
    this.http.get<Collection[]>(`http://82.202.173.178:8080/getCollectionList/${this.appService.curUser.userID}`).subscribe(
      (collectionList: Collection[]) => {
        this.loadedColList = collectionList;
      });
  }
  deleteCollection(): void {
    this.http.post<Collection>('http://82.202.173.178:8080/deleteCollection', this.collectionService.tmpCollection).subscribe(
      res => {
        if (res) {
          this.loadedColList.forEach((value, index) => {
            if (value.collectionID === this.collectionService.tmpCollection.collectionID) {
              this.indexForDelete = index;
            }
          });
          this.loadedColList.splice(this.indexForDelete, 1);
        }
        else {
          alert('Deletion failed. Please, try again');
        }
      });
    this.getUserCollections();
  }
  saveCollection(): void {
    this.collectionService.tmpCollection.theme = this.themeSelector.nativeElement.value;
    if (this.collectionService.tmpCollection.colImg == null){this.collectionService.tmpCollection.colImg = ''; }
    this.http.post<Collection>('http://82.202.173.178:8080/saveNewCollectionValues', this.collectionService.tmpCollection).subscribe(
      collection => {
        if (collection) {
          this.collectionService.tmpCollection = collection;
        }
        else {
          alert('Update failed. Please, try again');
        }
      });
  }

  addItemToCollection(): void {
    this.router.navigate(['add-item-page']);
  }

  showCollectionItems(): void {
    this.router.navigate(['item-page']);
  }
}
