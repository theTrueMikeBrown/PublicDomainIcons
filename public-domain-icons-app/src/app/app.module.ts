import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { IconListComponent } from './icon-list/icon-list.component';
import { BusinessService } from './services/business.service';
import { DbService } from './services/db.service';
import { environment } from '../environments/environment';
import { TagListComponent } from './tag-list/tag-list.component';

const appRoutes: Routes = [
  {
    path: 'icons',
    component: IconListComponent
  },
  {
    path: '',
    redirectTo: '/icons',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    IconListComponent,
    TagListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    BusinessService,
    DbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
