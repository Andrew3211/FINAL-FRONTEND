import {Injectable} from '@angular/core';
import {User, UserData} from './entity-classes/entity-classes.component';
import {Router} from '@angular/router';
import {AdminService} from './admin-service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  curUser: User;
  curUserData: UserData;
  isLogin = false;
  collectionDownloadUrl: string;
  constructor(private router: Router, private adminService: AdminService) {}
  login(): void {
    this.isLogin = true;
  }
  logout(): void {
    this.isLogin = false;
    this.curUserData = null;
    this.curUser = null;
    this.adminService.adminAccountSaver = null;
    this.router.navigate(['/']);
  }
}
