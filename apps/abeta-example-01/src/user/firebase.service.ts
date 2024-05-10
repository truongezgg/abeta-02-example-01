import * as firebase from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { getStorage } from 'firebase-admin/lib/storage';
require('dotenv').config();

@Injectable()
export class FirebaseService {
  private storage: firebase.storage.Storage;

  constructor() {
    // const serviceAccountPath = path.join(
    //   __dirname,
    //   '..',
    //   'serviceAccountKey.json',
    // );
    // firebase.initializeApp({
    //   credential: firebase.credential.cert(serviceAccountPath),
    //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // });
    // this.storage = firebase.storage();
  }
  getStorageInstance(): firebase.storage.Storage {
    return this.storage;
  }
}
