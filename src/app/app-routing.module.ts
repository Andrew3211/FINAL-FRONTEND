import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {PersonalProfileComponent} from './personal-profile/personal-profile.component';
import {CollectionPageComponent} from './collection-page/collection-page.component';
import {CreateCollectionPageComponent} from './create-collection-page/create-collection-page.component';
import {AdminPanelPageComponent} from './admin-panel-page/admin-panel-page.component';
import {AddItemPageComponent} from './add-item-page/add-item-page.component';
import {ItemPageComponent} from './item-page/item-page.component';

const routs: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'personal-page', component: PersonalProfileComponent},
  {path: 'collection-page', component: CollectionPageComponent},
  {path: 'create-collection-page', component: CreateCollectionPageComponent},
  {path: 'admin-panel-page', component: AdminPanelPageComponent},
  {path: 'add-item-page', component: AddItemPageComponent},
  {path: 'item-page', component: ItemPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routs)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{

}
