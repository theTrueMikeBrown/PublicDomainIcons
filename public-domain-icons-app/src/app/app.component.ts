import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BusinessService } from './services/business.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AngularFireAuth,    
              private business: BusinessService) { }
  login() {
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  removeBrokenImages() {
    this.business.removeBrokenImages();
  }
  logout() {
    this.auth.auth.signOut();
  }
}
