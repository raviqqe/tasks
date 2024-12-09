import { FirestoreProjectRepository } from "../infrastructure/firebase/firestore-project-repository.js";
import { firebaseApp } from "./firebase-app.js";

export const projectRepository = new FirestoreProjectRepository(firebaseApp);
