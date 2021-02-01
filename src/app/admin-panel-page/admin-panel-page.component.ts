import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../entity-classes/entity-classes.component';
import {AdminService} from '../admin-service';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.css']
})
export class AdminPanelPageComponent implements OnInit {
  @ViewChild('activeSelector', {static: false}) activeSelector: ElementRef;
  @ViewChild('roleSelector', {static: false}) roleSelector: ElementRef;
  @ViewChild('userTable', {static: false}) userTable: ElementRef;
  loadedUserList: User[];
  errorMsg: string;
  indexForDelete: number;
  constructor(public adminService: AdminService, private appService: AppService, public http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (!(this.appService.curUser.role.match('ADMIN'))) { this.router.navigate(['/']); }
    this.getUsersList();
    this.adminService.adminAccountSaver = this.appService.curUser;
  }

  getUsersList(): void {
    this.http.get<User[]>('http://82.202.173.178:8080/getUsersList').subscribe(
      (userList: User[]) => {
        this.loadedUserList = userList;
      });
  }

  saveEditableUser(): void {
    console.log(this.roleSelector.nativeElement.value);
    this.adminService.adminTempUser.role = this.roleSelector.nativeElement.value;
    this.http.post<User>('http://82.202.173.178:8080/saveNewUserValues', this.adminService.adminTempUser).subscribe(
      user => {
        if (user) {
          this.adminService.adminTempUser = user;
        }
        else {
          this.errorMsg = 'Error';
        }
      });
  }

  deleteUser(): void {
    this.http.post<User>('http://82.202.173.178:8080/deleteUser', this.adminService.adminTempUser).subscribe(
      res => {
        if (res) {
            this.loadedUserList.forEach((value, index) => {
              if (value.userID === this.adminService.adminTempUser.userID) {
                this.indexForDelete = index;
              }
            });
            this.loadedUserList.splice(this.indexForDelete, 1);
        }
        else {
          this.errorMsg = 'Error';
        }
      });
    this.getUsersList();
  }
}
