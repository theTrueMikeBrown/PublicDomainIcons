import { Component, OnInit, Inject, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import { BusinessService } from '../services/business.service';

import { Icon } from '../types/icon';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.css']
})
export class IconListComponent implements OnInit {
  // icons$: Observable<Icon[]>;
  icons: Observable<Icon[]>;
  isAdmin: boolean = true;
  private searchTerms = new Subject<string>();

  constructor(
    private business: BusinessService,
    public auth: AngularFireAuth) {
    this.business.getIcons().then(g => {
      this.icons = g;
    });
  }

  ngOnInit() {
    // this.icons$ = this.searchTerms.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.business.searchIcons(term)),
    // );
  }

  uploadFile(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      var file = event.target.files[i];
      if (!file.name.endsWith('.xcf')) {
        this.business.uploadIcon(file);
      }
    }
  }

  deleteIcon(id: string) {
    this.business.deleteIcon(id);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
