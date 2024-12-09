import { FirestoreDoneTaskRepository } from "../infrastructure/firebase/firestore-done-task-repository.js";
import { firebaseApp } from "./firebase-app.js";

export const doneTaskRepository = new FirestoreDoneTaskRepository(firebaseApp);
