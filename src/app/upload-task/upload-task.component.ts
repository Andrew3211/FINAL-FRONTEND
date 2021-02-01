import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {AppService} from '../app-service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})

export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private appService: AppService) {
  }

  ngOnInit(): void {
    this.startUpload();
  }

  startUpload(): void {
    const path = `img/${this.appService.curUser.username}/${Date.now()}_${this.file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.appService.collectionDownloadUrl = await ref.getDownloadURL().toPromise();
        this.db.collection('files').add({downloadURL: this.appService.collectionDownloadUrl, path});
        console.log(this.appService.collectionDownloadUrl);
      }),
    );
  }
}
