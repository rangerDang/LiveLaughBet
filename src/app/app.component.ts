import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'bootstrap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user;
  constructor(public afAuth: AngularFireAuth) {
    console.log(afAuth.auth.currentUser);
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user) => {
      console.log(user);
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
