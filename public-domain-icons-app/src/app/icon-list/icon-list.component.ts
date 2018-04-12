import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import { BusinessService } from '../services/business.service';

import { Icon } from '../types/icon';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.css']
})
export class IconListComponent implements OnInit {
  icons: Observable<Icon[]>;

  constructor(private business: BusinessService) {
    this.business.getIcons().then(g => {
        this.icons = g;
    })
  }

  ngOnInit() {
  }
}
