import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  where,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { db } from "@/lib/firebase/clientApp";
import { IMedia, IProject } from "@/app/types";
import { deleteFile } from "./storage";

export async function createProject(projectData: Omit<IProject, "id">) {
  const docRef = await addDoc(collection(db, "projects"), projectData);
  const newDocRef = doc(db, "projects", docRef.id);
  const docSnap = await getDoc(newDocRef);
  return docSnap.data() as unknown as IProject;
}

export async function getProjects(title = "") {
  let q = query(collection(db, "projects"));

  // Apply a filter if titleFilter is provided
  if (title) {
    q = query(
      q,
      where("title", ">=", title),
      where("title", "<=", title + "\uf8ff")
    );
  }

  const results = await getDocs(q);

  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as unknown as IProject;
  });
}

export async function getProjectById(projectId: string) {
  if (!projectId) {
    throw new Error("Error: Invalid ID received: " + projectId);
  }

  const docRef = doc(db, "projects", projectId);
  const docSnap = await getDoc(docRef);
  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as unknown as IProject;
}

export async function updateProjectFileReference(
  projectId: string,
  data: IMedia
) {
  const projectRef = doc(collection(db, "projects"), projectId);
  if (projectRef) {
    await updateDoc(projectRef, { media: arrayUnion(data) });
  }
}

export async function deleteFileReference(projectId?: string, data?: IMedia) {
  if (!projectId) throw new Error("No project ID has been provided.");

  if (!data) throw new Error("Valid data has not been provided.");

  const projectRef = doc(db, "projects", projectId);

  await updateDoc(projectRef, {
    media: arrayRemove(data),
  });

  await deleteFile(projectId, data.metaData.name);
}
