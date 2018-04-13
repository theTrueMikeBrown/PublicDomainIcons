import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import { BusinessService } from '../services/business.service';

import { Icon } from '../types/icon';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.css']
})
export class IconListComponent implements OnInit {
  icons: Observable<Icon[]>;
  isAdmin: boolean = true;

  constructor(
    private business: BusinessService,
    public auth: AngularFireAuth) {
    this.business.getIcons().then(g => {
      this.icons = g;
    })
  }

  ngOnInit() {
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
}
