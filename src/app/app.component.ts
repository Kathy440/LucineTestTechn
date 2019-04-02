import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Test technique';

constructor() {
  const config = {
    apiKey: "AIzaSyBY7kKH_9AoGqKovO3ruoG37mUIDOi0sEM",
    authDomain: "lucine-test-tech.firebaseapp.com",
    databaseURL: "https://lucine-test-tech.firebaseio.com",
    projectId: "lucine-test-tech",
    storageBucket: "lucine-test-tech.appspot.com",
    messagingSenderId: "556510167603"
  };
  firebase.initializeApp(config);
 }
}
