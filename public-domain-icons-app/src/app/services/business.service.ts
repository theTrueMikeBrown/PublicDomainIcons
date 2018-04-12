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
}
