import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import "rxjs/add/operator/map";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { Icon } from "../types/icon";

@Injectable()
export class DbService {
    constructor(private db: AngularFirestore) { }

    getIcons(priority: number = -1): Promise<Observable<Icon[]>> {
        let itemsList = this.db.collection<Icon>('icons', ref =>
            ref.orderBy('title', 'desc'));
        return Promise.resolve(itemsList.valueChanges());
    }
}