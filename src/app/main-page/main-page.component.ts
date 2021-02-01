import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app-service';
import {CollectionService} from '../collection-service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Item} from '../entity-classes/entity-classes.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  constructor(public collectionService: CollectionService, private appService: AppService, public http: HttpClient, private router: Router) {}
  ngOnInit(): void {
  }


}
