import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Item } from '@app/models';
import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {
  private subscriptions = new Subscription()
  @Input() file: File;
  @Input() imageUrls: String[];

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  ngOnInit(): void {
    this.startUpload();
  }

  startUpload() {
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`

    // Reference to storage bucket
    const ref = this.storage.ref(path)


    // The main task
    this.task = this.storage.upload(path, this.file)

    // Progress monitoring
    this.percentage = this.task.percentageChanges()

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async() => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection('files').add({ downloadURL: this.downloadURL, path})
        if (this.imageUrls.indexOf(this.downloadURL) < 0)
        this.imageUrls.push(this.downloadURL);
      })
    )
    this.subscriptions.add(this.snapshot.subscribe())
  }

  isActive(snapshot) {
    return snapshot.state === 'running'
    && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
