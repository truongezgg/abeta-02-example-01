/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
const { getStorage, getDownloadURL } = require('firebase-admin/storage');
require('dotenv').config();

@Injectable()
export class FirebaseStorageService {
  private readonly storage: admin.storage.Storage;

  constructor() {
    // // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const serviceAccount = require('../../../serviceAccountKey.json');
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // });
    // this.storage = admin.storage();
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
