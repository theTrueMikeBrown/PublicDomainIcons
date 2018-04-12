import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Icon } from '../types/icon';
import { DbService } from './db.service';

@Injectable()
export class BusinessService {

  constructor(private db: DbService) { }

  getIcons(): Promise<Observable<Icon[]>> {
    return this.db.getIcons(-1);
  }

  uploadIcons(): void {
    // var icons: Icon[] = [
    //   { "fileName": "1.svg", "title": "1", "id": "", "downloadUrl": "" }
    // ];

    // icons.forEach(icon => {
    //   this.db.uploadIcon(icon);      
    // });
  }
}
