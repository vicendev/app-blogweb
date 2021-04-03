import {storage} from '../firebase/firebase-config';

export const fileUpload = async(file) => {

  const uploadTask = await storage.ref(`/images/${file.name}`).put(file)
  const downloadUrl = await uploadTask.ref.getDownloadURL();

  return downloadUrl;

}

export const fileDeleted = (fileUrl) => {

  const imageRef = storage.refFromURL(fileUrl);

  imageRef.delete()
    .then(() => {
    }).catch((err) => {
      console.log(err)
    })

}