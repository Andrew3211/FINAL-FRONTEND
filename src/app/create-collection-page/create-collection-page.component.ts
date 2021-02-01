import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app-service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Collection, CustomItemFields, User} from '../entity-classes/entity-classes.component';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CollectionService} from '../collection-service';

@Component({
  selector: 'app-create-collection-page',
  templateUrl: './create-collection-page.component.html',
  styleUrls: ['./create-collection-page.component.css']
})
export class CreateCollectionPageComponent implements OnInit {
  @ViewChild('pageDiv', {static: false}) pageDiv: ElementRef;
  @ViewChild('bottomDiv', {static: false}) bottomDiv: ElementRef;
  @ViewChild('themeSelector', {static: false}) themeSelector: ElementRef;
  @ViewChild('cFNInput', {static: false}) cFNInput: ElementRef;
  @ViewChild('cSNInput', {static: false}) cSNInput: ElementRef;
  @ViewChild('cTNInput', {static: false}) cTNInput: ElementRef;
  @ViewChild('cFSInput', {static: false}) cFSInput: ElementRef;
  @ViewChild('cSSInput', {static: false}) cSSInput: ElementRef;
  @ViewChild('cTSInput', {static: false}) cTSInput: ElementRef;
  @ViewChild('cFDInput', {static: false}) cFDInput: ElementRef;
  @ViewChild('cSDInput', {static: false}) cSDInput: ElementRef;
  @ViewChild('cTDInput', {static: false}) cTDInput: ElementRef;
  @ViewChild('cFBInput', {static: false}) cFBInput: ElementRef;
  @ViewChild('cSBInput', {static: false}) cSBInput: ElementRef;
  @ViewChild('cTBInput', {static: false}) cTBInput: ElementRef;
  @ViewChild('cFTInput', {static: false}) cFTInput: ElementRef;
  @ViewChild('cSTInput', {static: false}) cSTInput: ElementRef;
  @ViewChild('cTTInput', {static: false}) cTTInput: ElementRef;
  collection: Collection;
  customItemFields: CustomItemFields;
  newCollectionForm: FormGroup = null;
  pageMark = false;

  constructor(private router: Router, public appService: AppService, public http: HttpClient, private fireStorage: AngularFireStorage, private collectionService: CollectionService) { }
  ngOnInit(): void {
    this.customItemFields = new CustomItemFields();
    this.collection = new Collection();
    this.collection.setNulls();
    this.collection.customItemFields = this.customItemFields;
    this.genNewCollectionForm();
    if (this.appService.curUser == null) { this.router.navigate(['/']); }
  }

  genNewCollectionForm(): void {
    this.newCollectionForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
      theme: new FormControl('', [
          Validators.required,
        ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      }
    );
  }
  saveNewCollection(): void {
    this.collection.colImg = this.appService.collectionDownloadUrl;
    this.collection.theme =  this.themeSelector.nativeElement.value;
    this.checkInputs();
    console.log(this.collection.usingCustomFields);
    this.http.post<Collection>( `http://82.202.173.178:8080/addCollection/${this.appService.curUser.userID}`, this.collection).subscribe(
      collection => {
        if (collection) {
          this.collectionService.tmpCollection = collection;
          this.router.navigate(['/collection-page']);
        }
        else {
          alert('Saving error. Try again');
        }
      });
  }
  changePageView(): void {
    this.pageMark = !this.pageMark;
  }
  checkInputs(): void {
    this.checkNumberInputs();
    this.checkStringInputs();
    this.checkDateInputs();
    this.checkBooleanInputs();
    this.checkTextInputs();
  }
  checkNumberInputs(): void {
    this.cFNInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [0][0] = false : this.collection.usingCustomFields [0][0] = true;
    this.cSNInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [0][1] = false : this.collection.usingCustomFields [0][1] = true;
    this.cTNInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [0][2] = false : this.collection.usingCustomFields [0][2] = true;
  }
  checkStringInputs(): void {
    this.cFSInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [1][0] = false : this.collection.usingCustomFields [1][0] = true;
    this.cSSInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [1][1] = false : this.collection.usingCustomFields [1][1] = true;
    this.cTSInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [1][2] = false : this.collection.usingCustomFields [1][2] = true;
  }
  checkDateInputs(): void {
    this.cFDInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [2][0] = false : this.collection.usingCustomFields [2][0] = true;
    this.cSDInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [2][1] = false : this.collection.usingCustomFields [2][1] = true;
    this.cTDInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [2][2] = false : this.collection.usingCustomFields [2][2] = true;
  }
  checkBooleanInputs(): void {
    this.cFBInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [3][0] = false : this.collection.usingCustomFields [3][0] = true;
    this.cSBInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [3][1] = false : this.collection.usingCustomFields [3][1] = true;
    this.cTBInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [3][2] = false : this.collection.usingCustomFields [3][2] = true;
  }
  checkTextInputs(): void {
    this.cFTInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [4][0] = false : this.collection.usingCustomFields [4][0] = true;
    this.cSTInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [4][1] = false : this.collection.usingCustomFields [4][1] = true;
    this.cTTInput.nativeElement.value.length === 0 ? this.collection.usingCustomFields [4][2] = false : this.collection.usingCustomFields [4][2] = true;
  }
}
