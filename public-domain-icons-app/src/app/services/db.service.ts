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

    getIcons(): Promise<Observable<Icon[]>> {
        let itemsList = this.db.collection<Icon>('icons', ref =>
            ref.orderBy('fileName', 'asc')
            //.limit(50)
        );
        return Promise.resolve(itemsList.valueChanges());
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
        var tagRef = this.db.collection('tags').doc(tag).set({ 'name': tag }).then(() => {
            let itemsList = this.db.collection('iconTags', ref =>
                ref.where('iconId', '==', id)
                    .where('tag', '==', tag));
            itemsList.valueChanges()
                .subscribe((array: Icon[]) => {
                    if (array.length === 0) {
                        this.db.collection('iconTags').add({ "iconId": id, "tag": tag });
                    }
                });
        });
    }

    searchIcons(term: string): Promise<Observable<Icon[]>> {        
        let subject: Subject<Icon> = new Subject;

        let iconTagsList = this.db.collection('iconTags', ref =>
            ref.where('tag', '==', term)
               .orderBy('name', 'asc')
               .limit(50)
            );

        // iconTagsList.valueChanges(iconTags => {
        //     var icons : Icon[] = [];
        //     iconTags.forEach(iconTag => {
        //         icons.push(iconTag);
        //     });
        //     //this.db.collection('icons').doc();
        // });

        return null;

        // return Promise.resolve(itemsList.valueChanges().map(icons => icons.map(icon => {
        //     if (!icon.tags) {
        //         icon.tags = [];
        //     }
        //     return icon;
        // })));
    }
}