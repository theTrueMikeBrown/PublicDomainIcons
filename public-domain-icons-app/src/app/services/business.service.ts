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

  uploadIcon(file: File): void {
    var icon = { "fileName": file.name, "title": file.name.replace(/\.[^/.]+$/, ""), "id": "", "downloadUrl": "", "tags":[] };

    this.db.uploadIcon(icon, file);
  }

  deleteIcon(id: string): void {
    this.db.deleteIcon(id);
  }

  addTag(id: string, tag: string): void {
    this.db.addTag(id, tag);
  }
}
