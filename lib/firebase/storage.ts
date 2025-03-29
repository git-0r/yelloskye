import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from "firebase/storage";

import { storage } from "@/lib/firebase/clientApp";

import { updateProjectFileReference } from "@/lib/firebase/firestore";

export async function updateProjectMedia(projectId?: string, file?: File) {
  if (!projectId) throw new Error("No project ID has been provided.");

  if (!file || !file.name)
    throw new Error("A valid file has not been provided.");

  const data = await uploadFile(projectId, file);
  await updateProjectFileReference(projectId, data);

  return data;
}

async function uploadFile(projectId: string, file: File) {
  const filePath = `media/${projectId}/${encodeURIComponent(file.name)}`;
  const newFileRef = ref(storage, filePath);
  await uploadBytesResumable(newFileRef, file);
  const metaData = await getMetadata(newFileRef);
  const donwloadURL = await getDownloadURL(newFileRef);

  return {
    metaData: {
      contentType: metaData.contentType,
      name: metaData.name,
      size: metaData.size,
    },
    donwloadURL,
  };
}

export async function deleteFile(projectId: string, fileName: string) {
  // Reference to the file in Firebase Storage
  const fileRef = ref(storage, `media/${projectId}/${fileName}`);

  // Delete file from Firebase Storage
  await deleteObject(fileRef);
  console.log(`File ${fileName} deleted from Storage`);
}
