import {Injectable} from '@angular/core';
import {User, UserData} from './entity-classes/entity-classes.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminTempUser: User;
  adminAccountSaver: User;
}
