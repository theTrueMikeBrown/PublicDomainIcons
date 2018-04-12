import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import "rxjs/add/operator/map";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { Icon } from "../types/icon";

@Injectable()
export class DbService {
    constructor(private db: AngularFirestore,
        private storage: AngularFireStorage) { }

    getIcons(priority: number = -1): Promise<Observable<Icon[]>> {
        let itemsList = this.db.collection<Icon>('icons', ref =>
            ref.orderBy('title', 'asc'));
        return Promise.resolve(itemsList.valueChanges());
    }

    uploadIcon(icon: Icon, data: Blob = null) {
        var icons = this.db.collection('icons');
        icons.add(icon)
            .then(firestoreRef => {
                const storageRef = this.storage.ref('icons/' + icon.fileName);
                storageRef.getDownloadURL().subscribe(url => {
                    icon.downloadUrl = url;
                    icon.id = firestoreRef.id;
                    this.db.collection('icons').doc(firestoreRef.id).set(icon)
                });
            });
    }
}