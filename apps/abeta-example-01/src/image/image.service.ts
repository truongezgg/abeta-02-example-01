import { Injectable } from '@nestjs/common';
// import { CreateImageDto } from './dto/create-image.dto';
// import { UpdateImageDto } from './dto/update-image.dto';
import { FirebaseStorageService } from '@app/firebase-storage';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { error } from 'console';

@Injectable()
export class ImageService {
  constructor(
    private readonly firebaseStorageService: FirebaseStorageService,
  ) {}

  async uploadImage(files: any[]) {
    const storage = this.firebaseStorageService.getStorageInstance();

    const bucket = storage.bucket();
    const arrayImage = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const fileName = `${Date.now()}_${files[i].originalname}`;
        const fileUpload = bucket.file(fileName);

        const stream = fileUpload.createWriteStream({
          metadata: {
            contentType: 'image/png',
          },
        });
        arrayImage.push(
          new Promise((resolve, reject) => {
            stream.on('error', (error) => {
              reject(error);
            });
            stream.on('finish', async () => {
              const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media`;
              resolve(imageUrl);
            });

            stream.end(files[i].buffer);
          }).then((data) => data),
        );
      }
      return Promise.all(arrayImage)
        .then((imageUrls) => imageUrls)
        .catch((error) => {
          // Handle any errors that occurred during the promise resolution
          console.error(error);
        });
    }

    return [];
  }
  // async uploadImageV2(files: any[]) {
  //   try {
  //     this.firebaseStorageService.getStorageInstance();
  //     for (let i = 0; i < files.length; i++) {
  //       const dateTime = this.giveCurrentDateTime();
  //       const storage = getStorage();
  //       const storageRef = ref(
  //         storage,
  //         `files/${files[i].originalname + '       ' + dateTime}`,
  //       );

  //       // Create file metadata including the content type
  //       const metadata = {
  //         contentType: files[i].mimetype,
  //       };

  //       // Upload the file in the bucket storage
  //       const snapshot = await uploadBytesResumable(
  //         storageRef,
  //         files[i].buffer,
  //         metadata,
  //       );
  //       //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

  //       // Grab the public url
  //       const downloadURL = await getDownloadURL(snapshot.ref);

  //       console.log('File successfully uploaded.');
  //       return {
  //         message: 'file uploaded to firebase storage',
  //         name: files[i].originalname,
  //         type: files[i].mimetype,
  //         downloadURL: downloadURL,
  //       };
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // }
  giveCurrentDateTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
  };
  // create(createImageDto: CreateImageDto) {
  //   return 'This action adds a new image';
  // }

  // findAll() {
  //   return `This action returns all image`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} image`;
  // }

  // update(id: number, updateImageDto: UpdateImageDto) {
  //   return `This action updates a #${id} image`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} image`;
  // }
}
