import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app-service';
import {HttpClient} from '@angular/common/http';
import {User} from '../entity-classes/entity-classes.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.css']
})
export class PersonalProfileComponent implements OnInit, OnDestroy {
  @ViewChild('sexInput', {static: false}) sexInput: ElementRef;
  @ViewChild('sexInputMale', {static: false}) sexInputMale: ElementRef;
  @ViewChild('sexInputFemale', {static: false}) sexInputFemale: ElementRef;
  @ViewChild('loader', {static: false}) loader: ElementRef;
  isInputDisabled = true;
  errorMsg: string;
  fileToUpload: File = null;
  tmpFile: File = null;
  imagePath: string;
  imgURL: any;
  mimeType: any;
  fileReader: FileReader = new FileReader();
  constructor(public appService: AppService, public http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.imgURL =  this.appService.curUser.avatarLink;
    if (this.appService.curUser == null) { this.router.navigate(['/']); }
  }
  ngOnDestroy(): void{
  }

  saveNewValues(): void {
    this.appService.curUser.avatarLink = this.appService.collectionDownloadUrl;
    this.appService.curUser.userData.sex = this.sexInput.nativeElement.value;
    this.http.post<User>('http://82.202.173.178:8080/saveNewUserValues', this.appService.curUser).subscribe(
      user => {
        if (user) {
          this.appService.curUser = user;
          this.appService.curUserData = user.userData;
        }
        else {
          this.errorMsg = 'Error';
        }
      });
  }
  handleFileInput(files: any): void {
    this.tmpFile = files.item(0);
    if (files.length === 0) {return; }
    this.mimeType = files[0].type;
    if (this.mimeType.match(/image\/*/) == null) {
      return;
    }
    this.imagePath = files;
    this.fileReader.readAsDataURL(files[0]);
    // tslint:disable-next-line:variable-name
    this.fileReader.onload = (_event) => {
      this.imgURL = this.fileReader.result;
      this.fileToUpload = this.tmpFile;
    };
  }
}
