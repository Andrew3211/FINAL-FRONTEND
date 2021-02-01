import {Injectable} from '@angular/core';
import {Collection, CustomItemFields, Item, User, UserData} from './entity-classes/entity-classes.component';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  tmpCollection: Collection;
  tmpItem: Item;
  tmpCustomItemFields: CustomItemFields;
}
