import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import "rxjs/add/operator/map";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as _ from 'underscore';

import { Icon } from "../types/icon";

@Injectable()
export class DbService {
    constructor(private db: AngularFirestore,
        private storage: AngularFireStorage) { }

    getIcons(priority: number = -1): Promise<Observable<Icon[]>> {
        let itemsList = this.db.collection<Icon>('icons', ref =>
            ref.orderBy('id', 'asc').limit(50));
        return Promise.resolve(itemsList.valueChanges().map(icons => icons.map(icon => {
            if (!icon.tags) {
                icon.tags = [];
            }
            return icon;
        })));
    }

    uploadIcon(icon: Icon, data: Blob = null) {
        if (data) {
            const createRef = this.storage.ref('icons/' + icon.fileName);
            createRef.put(data).then(snapshot => {
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
            });
        }
        else {
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

    deleteIcon(id: string): Promise<void> {
        return this.db.collection('icons').doc(id).delete();
    }

    addTag(id: string, tag: string): void {
        var doc = this.db.collection('icons').doc(id);
        doc.valueChanges().subscribe((ref: Icon) => {
            var tags: string[] = ref.tags || [];
            if (!tags.includes(tag)) {
                tags.push(tag);
                doc.update({ "tags": tags });
            }
        });
    }
}