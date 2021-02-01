import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AppService} from './app-service';
import {HttpClient} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Collection, CustomItemFields, Item, User, UserData} from './entity-classes/entity-classes.component';
import {CollectionService} from './collection-service';
import {AdminService} from './admin-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})

export class AppComponent implements OnInit {

  @ViewChild('regFormBtn', {static: false}) regFormBtn: ElementRef;
  @ViewChild('authFormBtn', {static: false}) authFormBtn: ElementRef;

  modalRef: BsModalRef;
  regForm: FormGroup;
  authForm: FormGroup;
  user: any;
  userData: any;
  errorMsg: string;

  constructor(public collectionService: CollectionService, public appService: AppService, private modalService: BsModalService, public http: HttpClient, private adminService: AdminService) {}

  ngOnInit(): void {
    this.genRegForm();
    this.genAuthForm();
    this.collectionService.tmpCollection = new Collection();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  genAuthForm(): void {
    this.authForm = new FormGroup({
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(1)
        ]),
      }
    );
  }

  genRegForm(): void {
    this.regForm = new FormGroup({
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.max(24)
        ]),
        email: new FormControl('', [
          Validators.email,
          Validators.required
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(1)
        ]),
      }
    );
  }

  authUser(): void {
    if (this.authForm.valid) {
      this.user = new User(null , this.authForm.get('username').value, this.authForm.get('password').value, '', null, null, null);
      this.http.post<User>('http://82.202.173.178:8080/authorization', this.user).subscribe(
        user => {
          if (user) {
            this.appService.curUser = user;
            this.appService.curUserData = user.userData;
            this.authForm.reset();
            this.modalRef.hide();
            this.appService.login();
          }
          else {
            this.errorMsg = 'User does not found';
          }
        });
    }
  }

  registrantUser(): void {
    if (this.regForm.valid) {
      this.user = new User(
        null,
        this.regForm.get('username').value,
        this.regForm.get('password').value,
        this.regForm.get('email').value,
        null, null, null);
      this.http.post<User>('http://82.202.173.178:8080/registration', this.user).subscribe(
        user => {
          this.appService.curUser = this.user = user;
          this.appService.curUserData = user.userData;
          this.regForm.reset();
        });
    }
    this.appService.login();
  }
}
