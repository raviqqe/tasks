import { FirestoreTodoTaskRepository } from "../infrastructure/firebase/firestore-todo-task-repository.js";
import { firebaseApp } from "./firebase-app.js";

export const todoTaskRepository = new FirestoreTodoTaskRepository(firebaseApp);
