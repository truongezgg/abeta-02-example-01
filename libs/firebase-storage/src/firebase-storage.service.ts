/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import path from "path";
import * as firebase from "firebase-admin";
const { getStorage, getDownloadURL } = require('firebase-admin/storage');
require('dotenv').config();

@Injectable()
export class FirebaseStorageService {
  private readonly storage: admin.storage.Storage;

  constructor() {
    // // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const serviceAccount = require('../../../Key.json');
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // });
    // this.storage = admin.storage();
    // const serviceAccountPath = require('Key.json');
    // firebase.initializeApp({
    //   credential: firebase.credential.cert(serviceAccountPath),
    //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // });
    // this.storage = firebase.storage();
  }
  getStorageInstance(): admin.storage.Storage {
    return this.storage;
  }
  async getDownloadURL(filePath: string) {
    const fileRef = getStorage(this.getStorageInstance())
      .bucket(process.env.FIREBASE_STORAGE_BUCKET)
      .file(filePath);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  }
}
