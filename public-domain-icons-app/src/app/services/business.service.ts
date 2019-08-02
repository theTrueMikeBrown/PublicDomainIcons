import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Icon } from '../types/icon';
import { DbService } from './db.service';

import { of } from 'rxjs/observable/of';

@Injectable()
export class BusinessService {

  constructor(private db: DbService) { }

  getIcons(): Promise<Observable<Icon[]>> {
    return this.db.getIcons();
  }

  uploadIcon(file: File): void {    
    var icon = { "fileName": file.name, "title": file.name.replace(/\.[^/.]+$/, ""), "id": "", "downloadUrl": "", "tags":[] };

    this.db.uploadIcon(icon, file);
  }

  deleteIcon(id: string): void {
    this.db.deleteIcon(id);
  }

  removeBrokenImages():void {
    this.db.removeBrokenImages();
  }

  addTag(id: string, tag: string): void {
    this.db.addTag(id, tag);
  }
}
