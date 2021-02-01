import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainPageComponent} from './main-page/main-page.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PersonalProfileComponent} from './personal-profile/personal-profile.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AppService} from './app-service';
import {CollectionPageComponent} from './collection-page/collection-page.component';
import { CreateCollectionPageComponent } from './create-collection-page/create-collection-page.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { AdminPanelPageComponent } from './admin-panel-page/admin-panel-page.component';
import {AdminService} from './admin-service';
import {CollectionService} from './collection-service';
import { AddItemPageComponent } from './add-item-page/add-item-page.component';
import { ItemPageComponent } from './item-page/item-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    PersonalProfileComponent,
    CollectionPageComponent,
    CreateCollectionPageComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    AdminPanelPageComponent,
    AddItemPageComponent,
    ItemPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    AppService,
    AdminService,
    CollectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
