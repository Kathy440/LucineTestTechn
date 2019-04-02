import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
    //method for create new user
    createNewUser(email: string, passeword: string) {
      return new Promise(
        (resolve, reject) => {
          firebase.auth().createUserWithEmailAndPassword(email, passeword).then(
            () => {
              resolve();
              console.log('Utilisateur crée');
            },
              (error) => {
                reject(error);
              }
          );
        }
      );
    }
  
    //Method for connect user
    signInUser(email: string, passeword: string) {
      return new Promise(
        (resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(email, passeword).then(
            () => {
              resolve();
              console.log('Vous êtes connecter');
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
    }
  
    //Method for disconned user
    signOutUser() {
      firebase.auth().signOut();
    }

}
