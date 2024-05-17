/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
const { getStorage, getDownloadURL } = require('firebase-admin/storage');
@Injectable()
export class FirebaseStorageService {
  private readonly storage: admin.storage.Storage;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const serviceAccount = require('./hadesproject-21965-firebase-adminsdk-irhf2-590aa3bca9.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'gs://hadesproject-21965.appspot.com',
    });
    this.storage = admin.storage();
  }
  getStorageInstance(): admin.storage.Storage {
    return this.storage;
  }
  async getDownloadURL(filePath: string) {
    const fileRef = getStorage(this.getStorageInstance())
      .bucket('gs://hadesproject-21965.appspot.com')
      .file(filePath);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  }
}
